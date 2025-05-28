<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseReportRequest;
use App\Models\ExpenseReport;
use App\Models\ExpenseReportCategory;
use App\Models\Merchant;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ExpenseReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $expenseReports = ExpenseReport::where('merchant_id', $merchantId)->orderBy('created_at', 'desc')->get();
        return Inertia::render('merchant/financial-management/expense-report/list-expense-report/index', [
            'expenseReports' => $expenseReports,
        ]);
    }

    public function create(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $expenseReportCategories = ExpenseReportCategory::where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/financial-management/expense-report/list-expense-report/pages/form', [
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
}
