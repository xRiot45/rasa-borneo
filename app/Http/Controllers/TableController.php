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
    public function index_merchant(): InertiaResponse
    {
        $tables = Table::all();
        return Inertia::render('merchant/store-management/table/index', [
            'data' => $tables,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('merchant/store-management/table/pages/form');
    }

    public function store(TableRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $validated = $request->validated();

        Table::create(array_merge($validated, ['merchant_id' => $merchantId]));

        return redirect()->route('merchant.table.index_merchant');
    }

    public function edit(int $id): InertiaResponse
    {
        $table = Table::findOrFail($id);
        return Inertia::render('merchant/store-management/table/pages/form', [
            'table' => $table,
        ]);
    }

    public function update(TableRequest $request, int $id): RedirectResponse
    {
        $validated = $request->validated();
        $table = Table::findOrFail($id);
        $table->update($validated);
        return redirect()->route('merchant.table.index_merchant');
    }
}
