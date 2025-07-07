<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
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

        // Rentang waktu berdasarkan zona waktu lokal
        $startOfDay = Carbon::parse($reportDate, config('app.timezone'))->startOfDay()->timezone('UTC');
        $endOfDay = Carbon::parse($reportDate, config('app.timezone'))->endOfDay()->timezone('UTC');

        // Ambil transaksi yang sesuai
        $this->transactions = Transaction::with(['latestOrderStatus'])
            ->where('merchant_id', $merchantId)
            ->whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->orderBy('checked_out_at', 'asc')
            ->get();

        // Buat ringkasan
        $this->summaryData = [
            'Tanggal Laporan' => $reportDate,
            'Total Transaksi Yang Berhasil' => $this->transactions->count(),
            'Total Pendapatan' => $this->transactions->sum('final_total'),
        ];
    }

    public function array(): array
    {
        $rows = [];

        $formattedDate = Carbon::parse($this->summaryData['Tanggal Laporan'])->format('d-m-Y');

        // Judul
        $rows[] = ['Laporan Pendapatan - ' . $formattedDate];
        $rows[] = [];

        // Ringkasan
        $rows[] = ['Total Transaksi Yang Berhasil', $this->summaryData['Total Transaksi Yang Berhasil'] . ' Transaksi'];
        $rows[] = [];

        // Header tabel transaksi
        $rows[] = ['No', 'Kode Transaksi', 'Tanggal & Waktu Pemesanan', 'Metode Pemesanan', 'Metode Pembayaran', 'Status Pembayaran', 'Status Pesanan'];

        // Data transaksi
        foreach ($this->transactions as $index => $trx) {
            $rows[] = [
                $index + 1,
                $trx->transaction_code,
                $trx->checked_out_at->setTimezone(config('app.timezone'))->format('Y-m-d H:i:s'),
                $trx->order_type->value ?? '-',
                $trx->payment_method->value ?? '-',
                $trx->payment_status->value ?? '-',
                $trx->latestOrderStatus->status ?? 'N/A'
            ];
        }

        $rows[] = [];
        $rows[] = ['Total Pendapatan', 'Rp. ' . number_format($this->summaryData['Total Pendapatan'], 0, ',', '.')];

        return $rows;
    }
}
