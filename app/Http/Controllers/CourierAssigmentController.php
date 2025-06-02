<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\OrderTypeEnum;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CourierAssigmentController extends Controller
{
    public function deliveryRequest(): InertiaResponse
    {
        $orders = Order::where('order_type', OrderTypeEnum::DELIVERY)
            ->with('merchant', 'merchant.storeProfile', 'merchant.businessCategory', 'transactionItems', 'latestOrderStatus')
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->get();

        return Inertia::render('courier/pages/delivery-request/index', [
            'orders' => $orders,
        ]);
    }
}
