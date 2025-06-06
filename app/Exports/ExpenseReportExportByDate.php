<?php

namespace App\Exports;

use App\Models\ExpenseReport;
use App\Models\ExpenseReportItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;

class ExpenseReportExportByDate implements FromArray
{
    protected $reportDate;
    protected $summaryData;
    protected $expenseReportItems;

    public function __construct($reportDate)
    {
        $this->reportDate = $reportDate;

        $user = Auth::user();
        $merchantId = $user->merchant->id;

        // Ambil data ExpenseReport berdasarkan merchant dan report_date
        $report = ExpenseReport::where('merchant_id', $merchantId)
            ->where('report_date', $reportDate)
            ->first();

        $this->summaryData = [
            'Tanggal Laporan' => $reportDate,
            'Deskripsi Pengeluaran' => $report->description ?? '-',
            'Total Pengeluaran' => $report->total_expense ?? 0,
        ];

        // Ambil item-item pengeluaran untuk laporan tersebut
        $this->expenseReportItems = ExpenseReportItem::with('expenseReportCategory')
            ->where('expense_report_id', $report->id ?? 0)
            ->orderBy('created_at')
            ->get();
    }

    public function array(): array
    {
        $rows = [];

        // Format tanggal laporan
        $formattedDate = Carbon::parse($this->summaryData['Tanggal Laporan'])->format('d-m-Y');

        // Judul laporan
        $rows[] = ['Laporan Pengeluaran - ' . $formattedDate];
        $rows[] = ['Deskripsi', $this->summaryData['Deskripsi Pengeluaran']];
        $rows[] = []; // spasi kosong

        // Header item pengeluaran
        $rows[] = ['No', 'Nama Pengeluaran', 'Kategori', 'Deskripsi', 'Jumlah Pengeluaran'];

        // Isi data item pengeluaran
        foreach ($this->expenseReportItems as $index => $item) {
            $rows[] = [
                $index + 1,
                $item->name,
                $item->expenseReportCategory->name ?? '-',
                $item->description,
                'Rp. ' . number_format($item->amount, 0, ',', '.'),
            ];
        }

        $rows[] = []; // spasi kosong sebelum total

        // Total pengeluaran
        $rows[] = ['Total Pengeluaran', 'Rp. ' . number_format($this->summaryData['Total Pengeluaran'], 0, ',', '.')];

        return $rows;
    }
}
