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

        $orderTypes = [
            'dineInOrders'   => OrderTypeEnum::DINEIN,
            'takeAwayOrders' => OrderTypeEnum::TAKEAWAY,
            'deliveryOrders' => OrderTypeEnum::DELIVERY,
            'pickupOrders'   => OrderTypeEnum::PICKUP,
        ];

        $orders = [];

        foreach ($orderTypes as $key => $type) {
            $orders[$key] = Order::where('merchant_id', $merchantId)
                ->whereNotNull('checked_out_at')
                ->where('order_type', $type->value)
                ->with('transactionItems')
                ->get();
        }

        return Inertia::render('merchant/order-management/incoming-orders/index', [
            'orders' => $orders
        ]);
    }
}
