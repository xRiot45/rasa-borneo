<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\RevenueReport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class RevenueReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $revenueReports = RevenueReport::where('merchant_id', $merchantId)->orderBy('created_at', 'desc')->get();
        $totalTransactions = RevenueReport::where('merchant_id', $merchantId)->sum('total_transaction');
        $totalRevenue = RevenueReport::where('merchant_id', $merchantId)->sum('total_revenue');

        $averageRevenuePerTransaction = $totalTransactions > 0 ? $totalRevenue / $totalTransactions : 0;
        $todayReport = RevenueReport::whereDate('report_date', Carbon::today())->first();
        $revenueByDate = RevenueReport::selectRaw('report_date, total_revenue')->get();

        $todayTransactions = 0;
        $todayRevenue = 0;
        $todayAverageRevenuePerTransaction = 0;

        if ($todayReport) {
            $todayTransactions = $todayReport->total_transaction;
            $todayRevenue = $todayReport->total_revenue;
            $todayAverageRevenuePerTransaction = $todayTransactions > 0 ? $todayRevenue / $todayTransactions : 0;
        }

        return Inertia::render('merchant/financial-management/revenue-report/index', [
            'data' => $revenueReports,
            'totalTransactions' => $totalTransactions,
            'totalRevenue' => $totalRevenue,
            'averageRevenuePerTransaction' => $averageRevenuePerTransaction,
            'todayTransactions' => $todayTransactions,
            'todayRevenue' => $todayRevenue,
            'todayAverageRevenuePerTransaction' => $todayAverageRevenuePerTransaction,
            'revenueByDate' => $revenueByDate,
        ]);
    }
}
