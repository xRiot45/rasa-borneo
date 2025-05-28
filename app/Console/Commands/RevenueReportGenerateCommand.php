<?php

namespace App\Console\Commands;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\ReportTypeEnum;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Console\Command;

class RevenueReportGenerateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:revenue-report-generate-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate revenue report';

    /**
     * Execute the console command.
     */
    // public function handle(): void
    // {
    //     // Konversi awal dan akhir hari dalam timezone lokal ke UTC
    //     $startOfDay = Carbon::today(config('app.timezone'))->startOfDay()->timezone('UTC');
    //     $endOfDay = Carbon::today(config('app.timezone'))->endOfDay()->timezone('UTC');

    //     $transactions = Transaction::whereBetween('checked_out_at', [$startOfDay, $endOfDay])
    //         ->where('payment_status', PaymentStatusEnum::PAID)
    //         ->whereHas('orderStatus', function ($query) {
    //             $query->where('status', OrderStatusEnum::COMPLETED);
    //         })
    //         ->get();

    //     if ($transactions->isEmpty()) {
    //         $this->info("Tidak ada transaksi pada tanggal {$startOfDay->toDateString()} (UTC range). Revenue report tidak dibuat.");
    //         return;
    //     }

    //     $groupedByMerchant = $transactions->groupBy('merchant_id');

    //     foreach ($groupedByMerchant as $merchantId => $merchantTransactions) {
    //         // Cek apakah report sudah ada
    //         $existingReport = RevenueReport::where('merchant_id', $merchantId)
    //             ->where('report_date', $startOfDay->toDateString())
    //             ->where('report_type', ReportTypeEnum::DAILY)
    //             ->exists();

    //         if ($existingReport) {
    //             $this->info("Laporan Pendapatan sudah ada untuk merchant ID: {$merchantId} pada tanggal {$startOfDay->toDateString()}, lewati...");
    //             continue;
    //         }

    //         $totalTransactions = $merchantTransactions->count();
    //         $totalRevenue = $merchantTransactions->reduce(function ($carry, $transaction) {
    //             $deliveryFee = $transaction->delivery_fee ?? 0;
    //             $serviceFee = $transaction->application_service_fee ?? 0;
    //             return $carry + ($transaction->final_total - $deliveryFee - $serviceFee);
    //         }, 0);

    //         RevenueReport::create([
    //             'merchant_id' => $merchantId,
    //             'report_date' => $startOfDay->toDateString(),
    //             'report_type' => ReportTypeEnum::DAILY,
    //             'total_transaction' => $totalTransactions,
    //             'total_revenue' => $totalRevenue,
    //         ]);

    //         $this->info("Revenue report dibuat untuk merchant ID: {$merchantId}");
    //     }
    // }

    // Fungsi untuk membuat laporan keuangan hari ini dan hari hari sebelumnya
    public function handle(): void
    {
        // Ambil tanggal paling awal transaksi
        $firstDate = Transaction::min('checked_out_at');
        if (!$firstDate) {
            $this->info('Tidak ada transaksi sama sekali.');
            return;
        }

        $startDate = Carbon::parse($firstDate)->setTimezone(config('app.timezone'))->startOfDay();
        $endDate = Carbon::today(config('app.timezone'))->endOfDay(); // termasuk hari ini

        $currentDate = $startDate->copy();

        while ($currentDate->lte($endDate)) {
            $startOfDay = $currentDate->copy()->startOfDay()->timezone('UTC');
            $endOfDay = $currentDate->copy()->endOfDay()->timezone('UTC');

            $transactions = Transaction::whereBetween('checked_out_at', [$startOfDay, $endOfDay])
                ->where('payment_status', PaymentStatusEnum::PAID)
                ->whereHas('orderStatus', function ($query) {
                    $query->where('status', OrderStatusEnum::COMPLETED);
                })
                ->get();

            if ($transactions->isEmpty()) {
                $this->info("Tidak ada transaksi pada tanggal {$startOfDay->toDateString()} (UTC).");
                $currentDate->addDay();
                continue;
            }

            $groupedByMerchant = $transactions->groupBy('merchant_id');

            foreach ($groupedByMerchant as $merchantId => $merchantTransactions) {
                $existingReport = RevenueReport::where('merchant_id', $merchantId)
                    ->where('report_date', $startOfDay->toDateString())
                    ->where('report_type', ReportTypeEnum::DAILY)
                    ->exists();

                if ($existingReport) {
                    $this->info("Laporan sudah ada untuk merchant ID: {$merchantId} pada tanggal {$startOfDay->toDateString()}, lewati...");
                    continue;
                }

                $totalTransactions = $merchantTransactions->count();
                $totalRevenue = $merchantTransactions->reduce(function ($carry, $transaction) {
                    $deliveryFee = $transaction->delivery_fee ?? 0;
                    $serviceFee = $transaction->application_service_fee ?? 0;
                    return $carry + ($transaction->final_total - $deliveryFee - $serviceFee);
                }, 0);

                RevenueReport::create([
                    'merchant_id' => $merchantId,
                    'report_date' => $startOfDay->toDateString(),
                    'report_type' => ReportTypeEnum::DAILY,
                    'total_transaction' => $totalTransactions,
                    'total_revenue' => $totalRevenue,
                ]);

                $this->info("Laporan dibuat untuk merchant ID: {$merchantId} pada tanggal {$startOfDay->toDateString()}");
            }

            $currentDate->addDay();
        }

        $this->info('Semua laporan selesai dibuat.');
    }
}
