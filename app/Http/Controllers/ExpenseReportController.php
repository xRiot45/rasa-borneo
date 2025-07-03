<?php

namespace App\Http\Controllers;

use App\Exports\ExpenseReportExportAll;
use App\Exports\ExpenseReportExportByDate;
use App\Http\Requests\ExpenseReportRequest;
use App\Models\ExpenseReport;
use App\Models\ExpenseReportCategory;
use App\Models\Merchant;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExpenseReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $expenseReports = ExpenseReport::where('merchant_id', $merchantId)->orderBy('report_date', 'asc')->get();
        $expenseSummary = [
            'total_expense' => $expenseReports->sum('total_expense'),
            'total_reports' => $expenseReports->count(),
            'highest_expense' => $expenseReports->max('total_expense'),
            'lowest_expense' => $expenseReports->min('total_expense'),
            'average_expense' => $expenseReports->avg('total_expense'),
        ];
        return Inertia::render('merchant/financial-management/expense/expense-report/index', [
            'expenseReports' => $expenseReports,
            'expenseSummary' => $expenseSummary,
        ]);
    }

    public function detailReport(string $reportDate): InertiaResponse
    {
        $expenseReport = ExpenseReport::with('expenseReportItems', 'expenseReportItems.expenseReportCategory')->where('report_date', $reportDate)->first();
        return Inertia::render('merchant/financial-management/expense/expense-report/pages/detail-report/index', [
            'expenseReport' => $expenseReport,
        ]);
    }

    public function create(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $expenseReportCategories = ExpenseReportCategory::where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/financial-management/expense/form-expense/index', [
            'expenseReportCategories' => $expenseReportCategories,
        ]);
    }

    public function store(ExpenseReportRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $validated = $request->validated();
        $validated['report_date'] = Carbon::parse($validated['report_date'])->toDateString();

        $totalExpense = collect($validated['items'])->sum('amount');
        $expenseReport = ExpenseReport::create([
            'merchant_id' => $merchantId,
            'report_date' => $validated['report_date'],
            'description' => $validated['description'] ?? null,
            'total_expense' => $totalExpense,
        ]);

        foreach ($validated['items'] as $item) {
            $expenseReport->expenseReportItems()->create([
                'name' => $item['name'],
                'category_id' => $item['category_id'],
                'description' => $item['description'] ?? null,
                'amount' => $item['amount'],
            ]);
        }

        return redirect()->route('merchant.expense-report.indexMerchant')->with('success', 'Laporan Pengeluaran Berhasil Ditambahkan');
    }

    public function edit(int $id): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $expenseReportCategories = ExpenseReportCategory::where('merchant_id', $merchantId)->get();
        $expenseReport = ExpenseReport::with('expenseReportItems', 'expenseReportItems.expenseReportCategory')->where('merchant_id', $merchantId)->where('id', $id)->first();
        return Inertia::render('merchant/financial-management/expense/form-expense/index', [
            'expenseReportCategories' => $expenseReportCategories,
            'expenseReport' => $expenseReport,
        ]);
    }

    public function update(ExpenseReportRequest $request, int $id): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $validated = $request->validated();
        $validated['report_date'] = Carbon::parse($validated['report_date'])->toDateString();

        $totalExpense = collect($validated['items'])->sum('amount');

        $expenseReport = ExpenseReport::where('id', $id)->where('merchant_id', $merchantId)->firstOrFail();

        $expenseReport->update([
            'report_date' => $validated['report_date'],
            'description' => $validated['description'] ?? null,
            'total_expense' => $totalExpense,
        ]);

        $expenseReport->expenseReportItems()->delete();

        foreach ($validated['items'] as $item) {
            $expenseReport->expenseReportItems()->create([
                'name' => $item['name'],
                'category_id' => $item['category_id'],
                'description' => $item['description'] ?? null,
                'amount' => $item['amount'],
            ]);
        }

        return redirect()->route('merchant.expense-report.indexMerchant')->with('success', 'Laporan Pengeluaran Berhasil Diperbarui');
    }

    public function destroy(int $id): RedirectResponse
    {
        $expenseReport = ExpenseReport::where('id', $id)->firstOrFail();
        $expenseReport->delete();

        return redirect()->route('merchant.expense-report.indexMerchant')->with('success', 'Laporan Pengeluaran Berhasil Dihapus');
    }

    public function exportAll(): BinaryFileResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        return Excel::download(new ExpenseReportExportAll($merchant->id), 'Semua Laporan Pengeluaran.csv');
    }

    public function exportByDate(string $reportDate): BinaryFileResponse
    {
        return Excel::download(new ExpenseReportExportByDate($reportDate), 'Laporan Pengeluaran ' . $reportDate . '.csv');
    }
}
