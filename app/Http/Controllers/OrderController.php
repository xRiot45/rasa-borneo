<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class OrderController extends Controller
{
    public function incomingOrder(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $orders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->with('transactionItems')
            ->get();

        return Inertia::render('merchant/order-management/incoming-orders/index', [
            'orders' => $orders
        ]);
    }
}
