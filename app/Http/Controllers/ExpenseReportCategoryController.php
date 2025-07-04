<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseReportCategoryRequest;
use App\Models\ExpenseReportCategory;
use App\Models\Merchant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ExpenseReportCategoryController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $expenseReportCategories = ExpenseReportCategory::where('merchant_id', $merchantId)->get();

        return Inertia::render('merchant/pages/financial-management/expense/expense-report-category/index', [
            'data' => $expenseReportCategories,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('merchant/pages/financial-management/expense/expense-report-category/pages/form');
    }

    public function store(ExpenseReportCategoryRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $validated = $request->validated();

        ExpenseReportCategory::create(
            array_merge($validated, [
                'merchant_id' => $merchantId,
            ]),
        );

        return redirect()->route('merchant.expense-report-category.indexMerchant')->with('success', 'Kategori pengeluaran berhasil ditambahkan');
    }

    public function edit(int $id): InertiaResponse
    {
        $expenseReportCategory = ExpenseReportCategory::find($id);
        return Inertia::render('merchant/pages/financial-management/expense/expense-report-category/pages/form', [
            'expenseReportCategory' => $expenseReportCategory,
        ]);
    }

    public function update(ExpenseReportCategoryRequest $request, int $id): RedirectResponse
    {
        $request->validated();

        $expenseReportCategory = ExpenseReportCategory::find($id);

        $expenseReportCategory->update($request->all());

        return redirect()->route('merchant.expense-report-category.indexMerchant')->with('success', 'Kategori pengeluaran berhasil diubah');
    }

    public function destroy(int $id): RedirectResponse
    {
        $expenseReportCategory = ExpenseReportCategory::find($id);
        $expenseReportCategory->delete();

        return redirect()->route('merchant.expense-report-category.indexMerchant')->with('success', 'Kategori pengeluaran berhasil dihapus');
    }
}
