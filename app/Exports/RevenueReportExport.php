<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;

class RevenueReportExport implements FromArray
{
    protected $reportGroups = [];

    public function __construct($from = null, $to = null)
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        $query = Transaction::with(['latestOrderStatus'])
            ->where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            });

        if ($from) {
            $query->whereDate('checked_out_at', '>=', Carbon::parse($from));
        }

        if ($to) {
            $query->whereDate('checked_out_at', '<=', Carbon::parse($to));
        }

        $transactions = $query->orderBy('checked_out_at', 'asc')->get()
            ->groupBy(function ($trx) {
                return Carbon::parse($trx->checked_out_at)->timezone(config('app.timezone'))->toDateString();
            });

        foreach ($transactions as $date => $items) {
            $summaryData = [
                'Tanggal Laporan' => Carbon::parse($date)->format('d-m-Y'),
                'Total Transaksi Yang Berhasil' => count($items),
                'Total Pendapatan' => $items->sum('final_total'),
            ];

            $this->reportGroups[] = [
                'summary' => $summaryData,
                'transactions' => $items,
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

            if ($lastDate !== null && $summary['Tanggal Laporan'] !== $lastDate) {
                $rows[] = [' '];
                $rows[] = [' '];
            }
            $lastDate = $summary['Tanggal Laporan'];

            $rows[] = ['Laporan Pendapatan - ' . $summary['Tanggal Laporan']];
            $rows[] = ['Total Transaksi Yang Berhasil', $summary['Total Transaksi Yang Berhasil'] . ' Transaksi'];
            $rows[] = [];

            $rows[] = ['No', 'Kode Transaksi', 'Tanggal & Waktu Pemesanan', 'Metode Pemesanan', 'Metode Pembayaran', 'Status Pembayaran', 'Status Pesanan'];

            foreach ($transactions as $index => $trx) {
                $rows[] = [$index + 1, $trx->transaction_code, $trx->checked_out_at->timezone(config('app.timezone'))->format('Y-m-d H:i:s'), $trx->order_type->value ?? '-', $trx->payment_method->value ?? '-', $trx->payment_status->value ?? '-', $trx->latestOrderStatus->status ?? 'N/A'];
            }

            $rows[] = [];
            $rows[] = ['Total Pendapatan', 'Rp. ' . number_format($summary['Total Pendapatan'], 0, ',', '.')];
            $rows[] = [];
        }

        return $rows;
    }
}
