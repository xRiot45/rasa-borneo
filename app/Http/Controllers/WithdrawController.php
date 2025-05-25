<?php

namespace App\Http\Controllers;

use App\Http\Requests\WithdrawRequest;
use App\Models\Merchant;
use App\Models\Withdraw;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WithdrawController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $withdraws = Withdraw::where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/financial-management/withdraw/index', [
            'data' => $withdraws,
        ]);
    }

    public function create(): InertiaResponse
    {
        $user = Auth::user();
        $merchantBank = Merchant::where('user_id', $user->id)->select('bank_code', 'bank_account_number', 'bank_account_name')->first();

        return Inertia::render('merchant/financial-management/withdraw/pages/form', [
            'merchantBank' => $merchantBank,
        ]);
    }

    public function store(WithdrawRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();

        if ($request->boolean('use_merchant_bank')) {
            $validated['bank_code'] = $merchant->bank_code;
            $validated['bank_account_number'] = $merchant->bank_account_number;
            $validated['bank_account_name'] = $merchant->bank_account_name;
        }

        Withdraw::create(
            array_merge($validated, [
                'merchant_id' => $merchant->id,
            ]),
        );

        return redirect()->route('merchant.withdraw.indexMerchant')->with('success', 'Pengajuan Penarikan Dana Berhasil');
    }
}
