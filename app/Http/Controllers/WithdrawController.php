<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\Withdraw;
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
            'withdraws' => $withdraws,
        ]);
    }
}
