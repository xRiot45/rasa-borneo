<?php

namespace App\Http\Controllers;

use App\Enums\OrderTypeEnum;
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

        $dineInOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::DINEIN->value)
            ->with('transactionItems')
            ->get();

        $takeAwayOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::TAKEAWAY->value)
            ->with('transactionItems')
            ->get();

        $deliveryOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::DELIVERY->value)
            ->with('transactionItems')
            ->get();

        $pickupOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::PICKUP->value)
            ->with('transactionItems')
            ->get();

        return Inertia::render('merchant/order-management/incoming-orders/index', [
            'dineInOrders' => $dineInOrders,
            'takeAwayOrders' => $takeAwayOrders,
            'deliveryOrders' => $deliveryOrders,
            'pickupOrders' => $pickupOrders
        ]);
    }

    public function showOrderDetail(string $transactionCode): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();

        $order = Order::where('transaction_code', $transactionCode)
            ->where('merchant_id', $merchant->id)
            ->with(['transactionItems', 'customer', 'orderStatus'])
            ->firstOrFail();

        return Inertia::render('merchant/order-management/incoming-orders/pages/detail', [
            'order' => $order
        ]);
    }
}
