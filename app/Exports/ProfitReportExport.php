<?php

namespace App\Exports;

use App\Models\ProfitReport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProfitReportExport implements FromArray, WithHeadings
{
    protected $reports;

    public function __construct()
    {
        $merchantId = Auth::user()->merchant->id;

        // Ambil semua laporan laba milik merchant
        $this->reports = ProfitReport::where('merchant_id', $merchantId)
            ->orderByDesc('start_date')
            ->get();
    }

    public function array(): array
    {
        $data = [];

        foreach ($this->reports as $report) {
            $data[] = [
                Carbon::parse($report->start_date)->format('d-m-Y'),
                Carbon::parse($report->end_date)->format('d-m-Y'),
                $report->report_type->value ?? '-',
                'Rp. ' . number_format($report->total_revenue, 0, ',', '.'),
                'Rp. ' . number_format($report->total_expense, 0, ',', '.'),
                'Rp. ' . number_format($report->gross_profit, 0, ',', '.'),
                'Rp. ' . number_format($report->net_profit, 0, ',', '.'),
            ];
        }

        return $data;
    }

    public function headings(): array
    {
        return [
            'Tanggal Mulai',
            'Tanggal Selesai',
            'Jenis Laporan',
            'Total Pendapatan',
            'Total Pengeluaran',
            'Laba Kotor',
            'Laba Bersih',
        ];
    }
}
