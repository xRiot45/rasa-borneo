<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\PaymentStatusEnum;
use App\Exports\RevenueReportExport;
use App\Models\Merchant;
use App\Models\Order;
use App\Models\RevenueReport;
use App\Models\Transaction;
use Carbon\Carbon;
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
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $revenueReports = RevenueReport::where('merchant_id', $merchantId)->orderBy('report_date', 'asc')->get();
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

    public function detailReport($reportDate): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->firstOrFail();
        $merchantId = $merchant->id;

        $revenueReport = RevenueReport::where('report_date', $reportDate)->where('merchant_id', $merchantId)->first();

        if (!$revenueReport) {
            abort(404);
        }

        // Hitung range UTC dari report date lokal
        $startOfDay = Carbon::parse($reportDate, config('app.timezone'))->startOfDay()->timezone('UTC');
        $endOfDay = Carbon::parse($reportDate, config('app.timezone'))->endOfDay()->timezone('UTC');

        $transactions = Transaction::with(['latestOrderStatus']) // ← tambahkan eager loading
            ->where('merchant_id', $merchantId)
            ->whereBetween('checked_out_at', [$startOfDay, $endOfDay])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->whereHas('orderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED);
            })
            ->get();

        return Inertia::render('merchant/financial-management/revenue-report/pages/detail-report/index', [
            'report' => $revenueReport,
            'transactions' => $transactions,
        ]);
    }

    public function export($reportDate): BinaryFileResponse
    {
        return Excel::download(new RevenueReportExport($reportDate), "revenue-report-{$reportDate}.csv");
    }
}
