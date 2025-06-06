<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;

class RevenueReportExportByDate implements FromArray
{
    protected $reportDate;
    protected $summaryData;
    protected $transactions;

    public function __construct($reportDate)
    {
        $this->reportDate = $reportDate;

        $user = Auth::user();
        $merchantId = $user->merchant->id;

        // Summary Data
        $report = RevenueReport::where('merchant_id', $merchantId)->where('report_date', $reportDate)->first();

        $this->summaryData = [
            'Tanggal Laporan' => $reportDate,
            'Total Transaksi Yang Berhasil' => $report->total_transaction ?? 0,
            'Total Pendapatan' => $report->total_revenue ?? 0,
        ];

        // Detail Transaksi
        $startOfDay = Carbon::parse($reportDate, config('app.timezone'))->startOfDay()->timezone('UTC');
        $endOfDay = Carbon::parse($reportDate, config('app.timezone'))->endOfDay()->timezone('UTC');

        $this->transactions = Transaction::with(['latestOrderStatus'])
            ->where('merchant_id', $merchantId)
            ->whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->get();
    }

    public function array(): array
    {
        $rows = [];

        // Format tanggal laporan dengan Carbon
        $formattedDate = Carbon::parse($this->summaryData['Tanggal Laporan'])->format('d-m-Y');

        // Baris judul utama
        $rows[] = ['Laporan Pendapatan - ' . $formattedDate];
        $rows[] = []; // spasi kosong

        // Ringkasan laporan
        $rows[] = ['Total Transaksi Yang Berhasil', $this->summaryData['Total Transaksi Yang Berhasil'] . ' Transaksi'];
        $rows[] = []; // spasi kosong

        // Header data transaksi
        $rows[] = ['No', 'Kode Transaksi', 'Tanggal & Waktu Pemesanan', 'Metode Pemesanan', 'Metode Pembayaran', 'Status Pembayaran', 'Status Pesanan'];

        // Data transaksi
        foreach ($this->transactions as $index => $trx) {
            $rows[] = [$index + 1, $trx->transaction_code, $trx->checked_out_at->timezone(config('app.timezone'))->format('Y-m-d H:i:s'), $trx->order_type->value ?? '-', $trx->payment_method->value ?? '-', $trx->payment_status->value, $trx->latestOrderStatus->status ?? 'N/A'];
        }

        $rows[] = []; // spasi kosong sebelum total pendapatan

        // Total pendapatan
        $rows[] = ['Total Pendapatan', 'Rp. ' . number_format($this->summaryData['Total Pendapatan'], 0, ',', '.')];

        return $rows;
    }
}
