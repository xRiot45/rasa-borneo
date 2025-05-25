<?php

namespace App\Http\Controllers;

use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Enums\WithdrawStatusEnum;
use App\Http\Requests\WithdrawRequest;
use App\Models\Merchant;
use App\Models\Transaction;
use App\Models\Withdraw;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WithdrawController extends Controller
{
    private function calculateMerchantBalance(int $merchantId): array
    {
        // Hitung total pendapatan cashless yang sudah dibayar
        $subtotal = Transaction::where('merchant_id', $merchantId)->where('payment_method', PaymentMethodEnum::CASHLESS)->where('payment_status', PaymentStatusEnum::PAID)->sum('subtotal_transaction_item');

        $totalDiscount = Transaction::where('merchant_id', $merchantId)->where('payment_method', PaymentMethodEnum::CASHLESS)->where('payment_status', PaymentStatusEnum::PAID)->sum('discount_total');

        $totalRevenue = $subtotal - $totalDiscount;

        $totalWithdrawn = Withdraw::where('merchant_id', $merchantId)
            ->whereNotIn('status', [WithdrawStatusEnum::REJECTED, WithdrawStatusEnum::CANCELED])
            ->sum('amount');

        $remainingBalance = $totalRevenue - $totalWithdrawn;

        return [
            'subtotal' => $subtotal,
            'totalDiscount' => $totalDiscount,
            'totalRevenue' => $totalRevenue,
            'totalWithdrawn' => $totalWithdrawn,
            'remainingBalance' => $remainingBalance,
        ];
    }

    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $balances = $this->calculateMerchantBalance($merchantId);
        $withdraws = Withdraw::where('merchant_id', $merchantId)->get();

        return Inertia::render('merchant/financial-management/withdraw/index', [
            'data' => $withdraws,
            'totalRevenue' => $balances['totalRevenue'],
            'totalWithdrawn' => $balances['totalWithdrawn'],
            'remainingBalance' => $balances['remainingBalance'],
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
        $merchantId = $merchant->id;

        $balances = $this->calculateMerchantBalance($merchantId);

        if ($validated['amount'] > $balances['remainingBalance']) {
            return back()->withErrors(['amount' => 'Jumlah penarikan melebihi saldo yang tersedia.']);
        }

        if ($request->boolean('use_merchant_bank')) {
            $validated['bank_code'] = $merchant->bank_code;
            $validated['bank_account_number'] = $merchant->bank_account_number;
            $validated['bank_account_name'] = $merchant->bank_account_name;
        }

        Withdraw::create(
            array_merge($validated, [
                'merchant_id' => $merchantId,
            ]),
        );

        return redirect()->route('merchant.withdraw.indexMerchant')->with('success', 'Pengajuan Penarikan Dana Berhasil');
    }
}
