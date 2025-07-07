<?php

namespace App\Exports;

use App\Models\ExpenseReport;
use App\Models\ExpenseReportItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;

class ExpenseReportExport implements FromArray
{
    protected $reportGroups = [];

    public function __construct($from = null, $to = null)
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        $query = ExpenseReport::where('merchant_id', $merchantId)
            ->orderBy('report_date', 'asc');

        // Terapkan filter tanggal jika diberikan
        if ($from) {
            $query->whereDate('report_date', '>=', Carbon::parse($from));
        }

        if ($to) {
            $query->whereDate('report_date', '<=', Carbon::parse($to));
        }

        $expenseReports = $query->get();

        foreach ($expenseReports as $expenseReport) {
            $reportDate = Carbon::parse($expenseReport->report_date)->format('d-m-Y');

            $summaryData = [
                'Tanggal Laporan' => $reportDate,
                'Deskripsi Pengeluaran' => $expenseReport->description,
                'Total Pengeluaran' => $expenseReport->total_expense ?? 0,
            ];

            $expenseReportItems = ExpenseReportItem::where('expense_report_id', $expenseReport->id)
                ->with('expenseReportCategory')
                ->orderBy('created_at')
                ->get();

            $this->reportGroups[] = [
                'summary' => $summaryData,
                'items' => $expenseReportItems,
            ];
        }
    }

    public function array(): array
    {
        $rows = [];
        $lastDate = null;

        foreach ($this->reportGroups as $group) {
            $summary = $group['summary'];
            $items = $group['items'];

            if ($lastDate !== null && $summary['Tanggal Laporan'] !== $lastDate) {
                $rows[] = [' '];
                $rows[] = [' '];
            }
            $lastDate = $summary['Tanggal Laporan'];

            $rows[] = ['Laporan Pengeluaran - ' . $summary['Tanggal Laporan']];
            $rows[] = ['Deskripsi', $summary['Deskripsi Pengeluaran']];
            $rows[] = [];

            $rows[] = ['No', 'Nama Pengeluaran', 'Kategori', 'Deskripsi', 'Jumlah Pengeluaran'];

            foreach ($items as $index => $item) {
                $rows[] = [
                    $index + 1,
                    $item->name,
                    $item->expenseReportCategory->name ?? '-',
                    $item->description,
                    'Rp. ' . number_format($item->amount, 0, ',', '.'),
                ];
            }

            $rows[] = [''];
            $rows[] = ['Total Pengeluaran', 'Rp. ' . number_format($summary['Total Pengeluaran'], 0, ',', '.')];
            $rows[] = [];
        }

        return $rows;
    }
}
