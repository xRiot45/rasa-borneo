<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatusEnum;
use App\Enums\ReportTypeEnum;
use App\Exports\ProfitReportExport;
use App\Models\ExpenseReport;
use App\Models\Merchant;
use App\Models\ProfitReport;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProfitReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $profitReports = ProfitReport::where('merchant_id', $merchantId)->orderBy('created_at', 'desc')->get();
        return Inertia::render('merchant/pages/financial-management/profit-report/index', [
            'profitReports' => $profitReports,
        ]);
    }

    public function show(int $id): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->firstOrFail();

        $profitReport = ProfitReport::where('merchant_id', $merchant->id)->where('id', $id)->firstOrFail();

        $startDate = Carbon::parse($profitReport->start_date)->startOfDay()->timezone('Asia/Jakarta');
        $endDate = Carbon::parse($profitReport->end_date)->endOfDay()->timezone('Asia/Jakarta');

        $transactions = Transaction::where('merchant_id', $merchant->id)
            ->whereNotNull('checked_out_at')
            ->whereBetween('checked_out_at', [$startDate, $endDate])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->get()
            ->groupBy(fn($transaction) => Carbon::parse($transaction->checked_out_at)->toDateString());

        $expenseReports = ExpenseReport::where('merchant_id', $merchant->id)
            ->whereBetween('report_date', [$startDate, $endDate])
            ->get()
            ->groupBy(fn($report) => Carbon::parse($report->report_date)->toDateString());

        $reportDetails = [];
        $period = Carbon::parse($startDate)->daysUntil(Carbon::parse($endDate));
        foreach ($period as $date) {
            $formattedDate = $date->toDateString();

            $dailyTransactions = $transactions[$formattedDate] ?? collect();
            $revenue = $dailyTransactions->sum('final_total');

            $expenseGroup = $expenseReports[$formattedDate] ?? collect();
            $expenseTotal = $expenseGroup->sum('total_expense');

            $reportDetails[] = [
                'date' => $formattedDate,
                'total_revenue' => $revenue,
                'total_expense' => $expenseTotal,
            ];
        }

        return Inertia::render('merchant/pages/financial-management/profit-report/pages/detail-report/index', [
            'profitReport' => $profitReport,
            'reportDetails' => $reportDetails,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $reportType = ReportTypeEnum::from($request->input('report_type', ReportTypeEnum::DAILY->value));

        if ($reportType === ReportTypeEnum::CUSTOM) {
            $startDateInput = $request->input('start_date');
            $endDateInput = $request->input('end_date');

            if (!$startDateInput || !$endDateInput) {
                return redirect()->back()->with('error', 'Tanggal mulai dan tanggal akhir harus diisi untuk laporan custom.');
            }

            $startDate = Carbon::createFromFormat('Y-m-d', $startDateInput, config('app.timezone'))->startOfDay()->startOfDay()->timezone('Asia/Jakarta');
            $endDate = Carbon::createFromFormat('Y-m-d', $endDateInput, config('app.timezone'))->endOfDay()->startOfDay()->timezone('Asia/Jakarta');
        } else {
            [$startDate, $endDate] = match ($reportType) {
                ReportTypeEnum::DAILY => [now()->startOfDay(), now()->endOfDay()],
                ReportTypeEnum::WEEKLY => [now()->startOfWeek(), now()->endOfWeek()->endOfDay()],
                ReportTypeEnum::MONTHLY => [now()->startOfMonth(), now()->endOfMonth()->endOfDay()],
            };
        }

        $startDateUtc = $startDate;
        $endDateUtc = $endDate;

        $totalRevenue = Transaction::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->whereBetween('checked_out_at', [$startDateUtc, $endDateUtc])
            ->where('payment_status', PaymentStatusEnum::PAID)
            ->sum('final_total');

        $totalExpense = ExpenseReport::where('merchant_id', $merchantId)
            ->whereBetween('report_date', [$startDateUtc, $endDateUtc])
            ->sum('total_expense');

        $grossProfit = $totalRevenue;
        $netProfit = $grossProfit - $totalExpense;

        ProfitReport::create([
            'merchant_id' => $merchantId,
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'report_type' => $reportType->value,
            'total_revenue' => $totalRevenue,
            'total_expense' => $totalExpense,
            'gross_profit' => $grossProfit,
            'net_profit' => $netProfit,
        ]);

        return redirect()->back()->with('success', 'Laporan berhasil dibuat.');
    }

    public function exportProfitReport(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        return Excel::download(new ProfitReportExport($startDate, $endDate), 'Laporan Laba.csv');
    }


    public function destroy(int $id): RedirectResponse
    {
        ProfitReport::where('id', $id)->delete();
        return redirect()->back()->with('success', 'Laporan berhasil dihapus.');
    }
}
