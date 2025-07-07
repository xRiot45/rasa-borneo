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

    public function __construct($start_date = null, $end_date = null)
    {
        $merchantId = Auth::user()->merchant->id;

        $query = ProfitReport::where('merchant_id', $merchantId)
            ->orderByDesc('start_date');

        if ($start_date) {
            $query->whereDate('start_date', '>=', Carbon::parse($start_date));
        }

        if ($end_date) {
            $query->whereDate('end_date', '<=', Carbon::parse($end_date));
        }

        $this->reports = $query->get();
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
