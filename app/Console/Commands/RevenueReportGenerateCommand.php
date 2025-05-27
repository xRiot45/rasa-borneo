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
    public function handle()
    {
        // Konversi awal dan akhir hari dalam timezone lokal ke UTC
        $startOfDay = Carbon::today(config('app.timezone'))->startOfDay()->timezone('UTC');
        $endOfDay = Carbon::today(config('app.timezone'))->endOfDay()->timezone('UTC');

        $transactions = Transaction::whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->get();

        if ($transactions->isEmpty()) {
            $this->info("Tidak ada transaksi pada tanggal {$startOfDay->toDateString()} (UTC range). Revenue report tidak dibuat.");
            return;
        }

        $groupedByMerchant = $transactions->groupBy('merchant_id');

        foreach ($groupedByMerchant as $merchantId => $merchantTransactions) {
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
}
