<?php

namespace App\Http\Controllers;

use App\Enums\ReportTypeEnum;
use App\Models\ExpenseReport;
use App\Models\Merchant;
use App\Models\ProfitReport;
use App\Models\RevenueReport;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProfitReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        return Inertia::render('merchant/financial-management/profit-report/index');
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

            // Parsing tanggal dengan timezone aplikasi
            $startDate = Carbon::createFromFormat('Y-m-d', $startDateInput, config('app.timezone'))->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDateInput, config('app.timezone'))->endOfDay();
        } else {
            [$startDate, $endDate] = match ($reportType) {
                ReportTypeEnum::DAILY => [now()->startOfDay(), now()->endOfDay()],
                ReportTypeEnum::WEEKLY => [now()->startOfWeek(), now()->endOfWeek()],
                ReportTypeEnum::MONTHLY => [now()->startOfMonth(), now()->endOfMonth()],
            };
        }

        // Konversi ke UTC jika database pakai timezone UTC (biasanya MySQL)
        $startDateUtc = $startDate->copy()->setTimezone('UTC');
        $endDateUtc = $endDate->copy()->setTimezone('UTC');

        // Cek laporan yang sudah ada berdasarkan tanggal asli (string) dan tipe laporan
        $exists = ProfitReport::where('merchant_id', $merchantId)
            ->where('start_date', $startDate->toDateString())
            ->where('end_date', $endDate->toDateString())
            ->where('report_type', $reportType->value)
            ->exists();

        if ($exists) {
            return redirect()->back()->with('warning', 'Laporan sudah ada untuk periode ini.');
        }

        $totalRevenue = RevenueReport::where('merchant_id', $merchantId)
            ->whereBetween('report_date', [$startDateUtc, $endDateUtc])
            ->sum('total_revenue');

        $totalExpense = ExpenseReport::where('merchant_id', $merchantId)
            ->whereBetween('report_date', [$startDateUtc, $endDateUtc])
            ->sum('total_expense');

        $netRevenue = $totalRevenue;
        $grossProfit = $netRevenue;
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
}
