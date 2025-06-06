<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;
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

        // Header Baris 1
        $rows[] = [
            'Tanggal Laporan',
            'Total Transaksi Yang Berhasil',
            'Total Pendapatan',
            'Transaksi',
            '',
            '',
            '',
            '',
            '', // D1 - I1 merged
        ];

        // Header Baris 2
        $rows[] = ['', '', '', 'Kode Transaksi', 'Tanggal & Waktu Pemesanan', 'Metode Pemesanan', 'Metode Pembayaran', 'Status Pembayaran', 'Status Pesanan'];

        // Data transaksi
        foreach ($this->transactions as $trx) {
            $rows[] = [$this->summaryData['Tanggal Laporan'], $this->summaryData['Total Transaksi Yang Berhasil'] . ' Transaksi', 'Rp. ' . number_format($this->summaryData['Total Pendapatan'], 0, ',', '.'), $trx->transaction_code, $trx->checked_out_at->timezone(config('app.timezone'))->format('Y-m-d H:i:s'), $trx->order_type->value ?? '-', $trx->payment_method->value ?? '-', $trx->payment_status->value, $trx->latestOrderStatus->status ?? 'N/A'];
        }

        return $rows;
    }

    public function headings(): array
    {
        return [];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet;

                $transactionCount = count($this->transactions);
                $dataStartRow = 3;
                $dataEndRow = $dataStartRow + $transactionCount - 1;

                $sheet->mergeCells('A1:A2');
                $sheet->mergeCells('B1:B2');
                $sheet->mergeCells('C1:C2');
                $sheet->mergeCells('D1:I1');

                if ($transactionCount > 0) {
                    $sheet->mergeCells("A{$dataStartRow}:A{$dataEndRow}");
                    $sheet->mergeCells("B{$dataStartRow}:B{$dataEndRow}");
                    $sheet->mergeCells("C{$dataStartRow}:C{$dataEndRow}");
                }

                $sheet->getStyle('A1:I2')->getFont()->setBold(true);

                foreach (range('A', 'I') as $col) {
                    $sheet->getColumnDimension($col)->setAutoSize(true);
                }

                $sheet
                    ->getStyle("A1:I{$dataEndRow}")
                    ->getBorders()
                    ->getAllBorders()
                    ->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

                $sheet
                    ->getStyle("A1:I{$dataEndRow}")
                    ->getAlignment()
                    ->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER)
                    ->setVertical(\PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER);
            },
        ];
    }

    public function title(): string
    {
        return 'Laporan Pendapatan';
    }
}
