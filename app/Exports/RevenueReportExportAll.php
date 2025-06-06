<?php

namespace App\Exports;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class RevenueReportExportAll implements FromArray, WithHeadings, WithEvents, WithTitle
{
    protected $reportGroups = [];

    public function __construct()
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        // Ambil semua data laporan berdasarkan tanggal (report_date)
        $reports = RevenueReport::where('merchant_id', $merchantId)
            ->orderBy('report_date', 'asc')
            ->get();

        foreach ($reports as $report) {
            $reportDate = $report->report_date;
            $summaryData = [
                'Tanggal Laporan' => $reportDate,
                'Total Transaksi Yang Berhasil' => $report->total_transaction ?? 0,
                'Total Pendapatan' => $report->total_revenue ?? 0,
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

        foreach ($this->reportGroups as $group) {
            $summary = $group['summary'];
            $transactions = $group['transactions'];

            // Header Baris 1
            $rows[] = [
                'Tanggal Laporan',
                'Total Transaksi Yang Berhasil',
                'Total Pendapatan',
                'Detail Laporan',
                '',
                '',
                '',
                '',
                '',
            ];

            // Header Baris 2
            $rows[] = [
                '',
                '',
                '',
                'Kode Transaksi',
                'Tanggal & Waktu Pemesanan',
                'Metode Pemesanan',
                'Metode Pembayaran',
                'Status Pembayaran',
                'Status Pesanan'
            ];

            // Baris data
            foreach ($transactions as $trx) {
                $rows[] = [
                    Carbon::parse($summary['Tanggal Laporan'])->format('Y-m-d'),
                    $summary['Total Transaksi Yang Berhasil'] . ' Transaksi',
                    'Rp. ' . number_format($summary['Total Pendapatan'], 0, ',', '.'),
                    $trx->transaction_code,
                    $trx->checked_out_at->timezone(config('app.timezone'))->format('Y-m-d H:i:s'),
                    $trx->order_type->value ?? '-',
                    $trx->payment_method->value ?? '-',
                    $trx->payment_status->value,
                    $trx->latestOrderStatus->status ?? 'N/A'
                ];
            }

            // Baris kosong pemisah antar laporan
            $rows[] = [];
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
                $rowIndex = 1;

                foreach ($this->reportGroups as $group) {
                    $transactionCount = count($group['transactions']);
                    if ($transactionCount === 0) {
                        $rowIndex += 3; // skip if no data
                        continue;
                    }

                    $start = $rowIndex;
                    $headerRow1 = $start;
                    $headerRow2 = $start + 1;
                    $dataStart = $start + 2;
                    $dataEnd = $dataStart + $transactionCount - 1;

                    // Merge Headers
                    $sheet->mergeCells("A{$headerRow1}:A{$headerRow2}");
                    $sheet->mergeCells("B{$headerRow1}:B{$headerRow2}");
                    $sheet->mergeCells("C{$headerRow1}:C{$headerRow2}");
                    $sheet->mergeCells("D{$headerRow1}:I{$headerRow1}");

                    // Merge Summary Columns
                    $sheet->mergeCells("A{$dataStart}:A{$dataEnd}");
                    $sheet->mergeCells("B{$dataStart}:B{$dataEnd}");
                    $sheet->mergeCells("C{$dataStart}:C{$dataEnd}");

                    // Style
                    $sheet->getStyle("A{$headerRow1}:I{$headerRow2}")->getFont()->setBold(true);
                    $sheet->getStyle("A{$start}:I{$dataEnd}")
                        ->getAlignment()
                        ->setHorizontal(Alignment::HORIZONTAL_CENTER)
                        ->setVertical(Alignment::VERTICAL_CENTER);
                    $sheet->getStyle("A{$start}:I{$dataEnd}")
                        ->getBorders()
                        ->getAllBorders()
                        ->setBorderStyle(Border::BORDER_THIN);

                    $rowIndex = $dataEnd + 2; // +1 for empty line
                }

                // AutoSize Columns
                foreach (range('A', 'I') as $col) {
                    $sheet->getColumnDimension($col)->setAutoSize(true);
                }
            }
        ];
    }

    public function title(): string
    {
        return 'Semua Laporan Pendapatan';
    }
}
