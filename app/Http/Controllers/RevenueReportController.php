<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Exports\RevenueReportExport;
use App\Exports\RevenueReportExportByDate;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class RevenueReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        $completedTransactionIds = Transaction::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->pluck('id');

        $groupedReports = Transaction::selectRaw('DATE(checked_out_at) as report_date, COUNT(*) as total_transaction, SUM(final_total) as total_revenue')->whereIn('id', $completedTransactionIds)->groupByRaw('DATE(checked_out_at)')->orderBy('report_date', 'asc')->get();

        $revenueReports = $groupedReports->map(function ($item) {
            return [
                'report_date' => $item->report_date,
                'total_transaction' => (int) $item->total_transaction,
                'total_revenue' => (int) $item->total_revenue,
                'report_type' => 'daily',
            ];
        });

        $totalTransactions = $revenueReports->sum('total_transaction');
        $totalRevenue = $revenueReports->sum('total_revenue');
        $averageRevenuePerTransaction = $totalTransactions > 0 ? $totalRevenue / $totalTransactions : 0;

        $today = Carbon::today()->toDateString();
        $todayReport = $revenueReports->firstWhere('report_date', $today);

        $todayTransactions = $todayReport['total_transaction'] ?? 0;
        $todayRevenue = $todayReport['total_revenue'] ?? 0;
        $todayAverageRevenuePerTransaction = $todayTransactions > 0 ? $todayRevenue / $todayTransactions : 0;

        return Inertia::render('merchant/pages/financial-management/revenue-report/index', [
            'data' => $revenueReports,
            'totalTransactions' => $totalTransactions,
            'totalRevenue' => $totalRevenue,
            'averageRevenuePerTransaction' => $averageRevenuePerTransaction,
            'todayTransactions' => $todayTransactions,
            'todayRevenue' => $todayRevenue,
            'todayAverageRevenuePerTransaction' => $todayAverageRevenuePerTransaction,
        ]);
    }

    public function detailReport($reportDate): InertiaResponse
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        $startOfDay = Carbon::parse($reportDate, config('app.timezone'))->startOfDay()->timezone('Asia/Jakarta');
        $endOfDay = Carbon::parse($reportDate, config('app.timezone'))->endOfDay()->timezone('Asia/Jakarta');

        $transactions = Transaction::with(['latestOrderStatus'])
            ->where('merchant_id', $merchantId)
            ->whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->orderBy('checked_out_at', 'asc')
            ->get();

        $totalTransactions = $transactions->count();
        $totalRevenue = $transactions->sum('final_total');
        $averageRevenue = $totalTransactions > 0 ? $totalRevenue / $totalTransactions : 0;

        return Inertia::render('merchant/pages/financial-management/revenue-report/pages/detail-report/index', [
            'reportDate' => $reportDate,
            'totalTransactions' => $totalTransactions,
            'totalRevenue' => $totalRevenue,
            'averageRevenuePerTransaction' => $averageRevenue,
            'transactions' => $transactions,
        ]);
    }

    public function exportRevenueReport(Request $request): BinaryFileResponse
    {
        $from = $request->query('from');
        $to = $request->query('to');

        return Excel::download(new RevenueReportExport($from, $to), 'laporan-pendapatan.csv');
    }

    public function exportByDate($reportDate): BinaryFileResponse
    {
        return Excel::download(new RevenueReportExportByDate($reportDate), "Laporan Pendapatan - {$reportDate}.csv");
    }
}
