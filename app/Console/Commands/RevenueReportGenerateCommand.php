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

    protected $signature = 'app:revenue-report-generate-command';

    protected $description = 'Generate revenue report';


    // TODO: Untuk generate report hari ini saja
    public function handle(): void
    {
        $startOfDay = Carbon::today(config('app.timezone'))->startOfDay()->timezone('Asia/Jakarta');
        $endOfDay = Carbon::today(config('app.timezone'))->endOfDay()->timezone('Asia/Jakarta');

        $transactions = Transaction::whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->get();

        if ($transactions->isEmpty()) {
            $this->info("Tidak ada transaksi pada tanggal {$startOfDay->toDateString()} (in range). Revenue report tidak dibuat.");
            return;
        }

        $groupedByMerchant = $transactions->groupBy('merchant_id');

        foreach ($groupedByMerchant as $merchantId => $merchantTransactions) {
            // Cek apakah report sudah ada
            $existingReport = RevenueReport::where('merchant_id', $merchantId)
                ->where('report_date', $startOfDay->toDateString())
                ->where('report_type', ReportTypeEnum::DAILY)
                ->exists();

            if ($existingReport) {
                $this->info("Laporan Pendapatan sudah ada untuk merchant ID: {$merchantId} pada tanggal {$startOfDay->toDateString()}, lewati...");
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

            $this->info("Revenue report dibuat untuk merchant ID: {$merchantId}");
        }
    }

    // TODO: untuk membuat laporan keuangan hari ini dan hari hari sebelumnya
    // public function handle(): void
    // {
    //     $firstDate = Transaction::min('checked_out_at');
    //     if (!$firstDate) {
    //         $this->info('Tidak ada transaksi sama sekali.');
    //         return;
    //     }

    //     $startDate = Carbon::parse($firstDate)->setTimezone('UTC')->startOfDay();
    //     $endDate = Carbon::now('UTC')->endOfDay();

    //     $currentDate = $startDate->copy();

    //     while ($currentDate->lte($endDate)) {
    //         $startOfDay = $currentDate->copy()->startOfDay();
    //         $endOfDay = $currentDate->copy()->endOfDay();

    //         $transactions = Transaction::whereBetween('checked_out_at', [$startOfDay, $endOfDay])
    //             ->where('payment_status', PaymentStatusEnum::PAID)
    //             ->whereHas('orderStatus', function ($query) {
    //                 $query->where('status', OrderStatusEnum::COMPLETED);
    //             })
    //             ->get();

    //         if ($transactions->isEmpty()) {
    //             $this->info("Tidak ada transaksi pada tanggal {$startOfDay->toDateString()} (UTC).");
    //             $currentDate->addDay();
    //             continue;
    //         }

    //         $groupedByMerchant = $transactions->groupBy('merchant_id');

    //         foreach ($groupedByMerchant as $merchantId => $merchantTransactions) {
    //             $existingReport = RevenueReport::where('merchant_id', $merchantId)
    //                 ->where('report_date', $startOfDay->toDateString())
    //                 ->where('report_type', ReportTypeEnum::DAILY)
    //                 ->exists();

    //             if ($existingReport) {
    //                 $this->info("Laporan sudah ada untuk merchant ID: {$merchantId} pada tanggal {$startOfDay->toDateString()}, lewati...");
    //                 continue;
    //             }

    //             $totalTransactions = $merchantTransactions->count();
    //             $totalRevenue = $merchantTransactions->reduce(function ($carry, $transaction) {
    //                 $deliveryFee = $transaction->delivery_fee ?? 0;
    //                 $serviceFee = $transaction->application_service_fee ?? 0;
    //                 return $carry + ($transaction->final_total - $deliveryFee - $serviceFee);
    //             }, 0);

    //             RevenueReport::create([
    //                 'merchant_id' => $merchantId,
    //                 'report_date' => $currentDate->toDateString(), // Tetap gunakan currentDate UTC
    //                 'report_type' => ReportTypeEnum::DAILY,
    //                 'total_transaction' => $totalTransactions,
    //                 'total_revenue' => $totalRevenue,
    //             ]);

    //             $this->info("Laporan dibuat untuk merchant ID: {$merchantId} pada tanggal {$startOfDay->toDateString()}");
    //         }

    //         $currentDate->addDay();
    //     }

    //     $this->info('Semua laporan selesai dibuat.');
    // }
}
