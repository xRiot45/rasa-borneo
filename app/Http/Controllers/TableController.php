<?php

namespace App\Http\Controllers;

use App\Http\Requests\TableRequest;
use App\Models\Merchant;
use App\Models\Table;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TableController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $tables = Table::withTrashed()->where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/pages/store-management/table/index', [
            'data' => $tables,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('merchant/pages/store-management/table/pages/form');
    }

    public function store(TableRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $validated = $request->validated();

        Table::create(array_merge($validated, ['merchant_id' => $merchantId]));

        return redirect()->route('merchant.table.indexMerchant');
    }

    public function edit(int $id): InertiaResponse
    {
        $table = Table::findOrFail($id);
        return Inertia::render('merchant/pages/store-management/table/pages/form', [
            'table' => $table,
        ]);
    }

    public function update(TableRequest $request, int $id): RedirectResponse
    {
        $validated = $request->validated();
        $table = Table::findOrFail($id);
        $table->update($validated);
        return redirect()->route('merchant.table.indexMerchant');
    }

    public function softDelete(int $id): RedirectResponse
    {
        $table = Table::findOrFail($id);
        $table->delete();
        return redirect()->route('merchant.table.indexMerchant');
    }

    public function restore(int $id): RedirectResponse
    {
        $table = Table::withTrashed()->findOrFail($id);
        $table->restore();
        return redirect()->route('merchant.table.indexMerchant');
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $table = Table::onlyTrashed()->findOrFail($id);
        $table->forceDelete();
        return redirect()->route('merchant.table.indexMerchant');
    }
}
