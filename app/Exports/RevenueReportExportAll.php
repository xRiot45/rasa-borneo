<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;

class RevenueReportExportAll implements FromArray
{
    protected $reportGroups = [];

    public function __construct()
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        // Ambil semua data laporan berdasarkan tanggal (report_date)
        $revenueReports = RevenueReport::where('merchant_id', $merchantId)
            ->orderBy('report_date', 'asc')
            ->get();

        foreach ($revenueReports as $revenueReport) {
            $reportDate = Carbon::parse($revenueReport->report_date)->format('d-m-Y');
            $summaryData = [
                'Tanggal Laporan' => $reportDate,
                'Total Transaksi Yang Berhasil' => $revenueReport->total_transaction ?? 0,
                'Total Pendapatan' => $revenueReport->total_revenue ?? 0,
            ];

            // Ambil transaksi untuk tanggal tersebut
            $startOfDay = Carbon::parse($reportDate, config('app.timezone'))->startOfDay()->timezone('UTC');
            $endOfDay = Carbon::parse($reportDate, config('app.timezone'))->endOfDay()->timezone('UTC');

            $transactions = Transaction::with(['latestOrderStatus'])
                ->where('merchant_id', $merchantId)
                ->whereBetween('checked_out_at', [$startOfDay, $endOfDay])
                ->where('payment_status', PaymentStatusEnum::PAID)
                ->whereHas('orderStatus', function ($query) {
                    $query->where('status', OrderStatusEnum::COMPLETED);
                })
                ->get();

            $this->reportGroups[] = [
                'summary' => $summaryData,
                'transactions' => $transactions,
            ];
        }
    }

    public function array(): array
    {
        $rows = [];
        $lastDate = null;

        foreach ($this->reportGroups as $group) {
            $summary = $group['summary'];
            $transactions = $group['transactions'];

            // Tambahkan pemisah jika tanggal berubah
            if ($lastDate !== null && $summary['Tanggal Laporan'] !== $lastDate) {
                $rows[] = [' ']; // Baris kosong sebagai pemisah
                $rows[] = [' '];
            }
            $lastDate = $summary['Tanggal Laporan'];

            // Judul laporan per tanggal
            $rows[] = ['Laporan Pendapatan - ' . $summary['Tanggal Laporan']];

            // Summary total transaksi
            $rows[] = ['Total Transaksi Yang Berhasil', $summary['Total Transaksi Yang Berhasil'] . ' Transaksi'];

            $rows[] = []; // Spacer sebelum detail transaksi

            // Header detail transaksi
            $rows[] = [
                'No',
                'Kode Transaksi',
                'Tanggal & Waktu Pemesanan',
                'Metode Pemesanan',
                'Metode Pembayaran',
                'Status Pembayaran',
                'Status Pesanan'
            ];

            foreach ($transactions as $index => $trx) {
                $rows[] = [
                    $index + 1,
                    $trx->transaction_code,
                    $trx->checked_out_at->timezone(config('app.timezone'))->format('Y-m-d H:i:s'),
                    $trx->order_type->value ?? '-',
                    $trx->payment_method->value ?? '-',
                    $trx->payment_status->value,
                    $trx->latestOrderStatus->status ?? 'N/A'
                ];
            }

            // Spacer sebelum total pendapatan
            $rows[] = [];

            // Total pendapatan di bawah transaksi
            $rows[] = ['Total Pendapatan', 'Rp. ' . number_format($summary['Total Pendapatan'], 0, ',', '.')];

            // Spacer setelah total
            $rows[] = [];
        }

        return $rows;
    }
}
