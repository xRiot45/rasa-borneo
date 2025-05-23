<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\OrderTypeEnum;
use App\Models\Merchant;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus'])
            ->orderBy('created_at', 'desc')
            ->get();

        $takeAwayOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::TAKEAWAY->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus'])
            ->orderBy('created_at', 'desc')
            ->get();

        $deliveryOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::DELIVERY->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus'])
            ->orderBy('created_at', 'desc')
            ->get();

        $pickupOrders = Order::where('merchant_id', $merchantId)
            ->whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::PICKUP->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('merchant/order-management/incoming-orders/index', [
            'dineInOrders' => $dineInOrders,
            'takeAwayOrders' => $takeAwayOrders,
            'deliveryOrders' => $deliveryOrders,
            'pickupOrders' => $pickupOrders,
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
            'order' => $order,
        ]);
    }

    public function updateOrderStatus(Request $request, string $transactionCode): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string|in:' . implode(',', OrderStatusEnum::values()),
        ]);

        $newStatus = $request->input('status');

        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->firstOrFail();
        $merchantId = $merchant->id;

        $order = Order::where('transaction_code', $transactionCode)->where('merchant_id', $merchantId)->firstOrFail();

        $order->orderStatus()->create([
            'status' => $newStatus,
        ]);

        return redirect()->route('merchant.incoming-order.index')->with('success', 'Status berhasil diperbarui.');
    }
}
