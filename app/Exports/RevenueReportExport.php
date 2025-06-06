<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;

class RevenueReportExport implements FromArray, WithHeadings, WithEvents, WithTitle
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
        $report = RevenueReport::where('merchant_id', $merchantId)
            ->where('report_date', $reportDate)
            ->first();

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

        // Tambahkan ringkasan laporan
        $rows[] = [
            'Tanggal Laporan',
            'Total Transaksi Yang Berhasil',
            'Total Pendapatan'
        ];

        $rows[] = [
            $this->summaryData['Tanggal Laporan'],
            $this->summaryData['Total Transaksi Yang Berhasil'],
            $this->summaryData['Total Pendapatan']
        ];

        // Tambahkan baris kosong sebagai pemisah
        $rows[] = [];

        // Tambahkan header transaksi
        $rows[] = [
            'Kode Transaksi',
            'Tanggal & Waktu Pemesanan',
            'Metode Pemesanan',
            'Metode Pembayaran',
            'Status Pembayaran',
            'Status Pesanan'
        ];

        // Tambahkan data transaksi
        foreach ($this->transactions as $trx) {
            $rows[] = [
                $trx->code,
                $trx->checked_out_at->timezone(config('app.timezone'))->format('Y-m-d H:i:s'),
                $trx->order_type->value ?? '-',
                $trx->payment_method->value ?? '-',
                $trx->payment_status->value,
                $trx->latestOrderStatus->status ?? 'N/A',
            ];
        }

        return $rows;
    }

    public function headings(): array
    {
        // Tidak diperlukan karena sudah ditangani dalam array()
        return [];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Opsional: bold untuk heading
                $event->sheet->getStyle('A1:C1')->getFont()->setBold(true);
                $event->sheet->getStyle('A4:F4')->getFont()->setBold(true);
            },
        ];
    }

    public function title(): string
    {
        return 'Laporan Pendapatan';
    }
}
