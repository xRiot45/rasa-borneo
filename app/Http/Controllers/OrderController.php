<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Enums\OrderTypeEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Customer;
use App\Models\MenuItemReview;
use App\Models\Merchant;
use App\Models\MerchantWallet;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class OrderController extends Controller
{
    public function incomingOrderAdmin(): InertiaResponse
    {
        $dineInOrders = Order::whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::DINEIN->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus', 'merchant'])
            ->orderBy('created_at', 'desc')
            ->get();

        $takeAwayOrders = Order::whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::TAKEAWAY->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus', 'merchant'])
            ->orderBy('created_at', 'desc')
            ->get();

        $deliveryOrders = Order::whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::DELIVERY->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus', 'merchant'])
            ->orderBy('created_at', 'desc')
            ->get();

        $pickupOrders = Order::whereNotNull('checked_out_at')
            ->where('order_type', OrderTypeEnum::PICKUP->value)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus', 'merchant'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/order-management/incoming-orders/index', [
            'dineInOrders' => $dineInOrders,
            'takeAwayOrders' => $takeAwayOrders,
            'deliveryOrders' => $deliveryOrders,
            'pickupOrders' => $pickupOrders,
        ]);
    }

    public function incomingOrderMerchant(): InertiaResponse
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

    public function showOrderDetailAdmin(string $transactionCode): InertiaResponse
    {
        $order = Order::where('transaction_code', $transactionCode)
            ->with(['transactionItems', 'customer', 'orderStatus'])
            ->firstOrFail();

        return Inertia::render('admin/order-management/shared/order-detail/index', [
            'order' => $order,
        ]);
    }

    public function showOrderDetailMerchant(string $transactionCode): InertiaResponse
    {
        $order = Order::where('transaction_code', $transactionCode)
            ->with(['transactionItems', 'customer', 'orderStatus'])
            ->firstOrFail();

        return Inertia::render('merchant/order-management/shared/order-detail/index', [
            'order' => $order,
        ]);
    }

    public function showOrderDetailCustomer(string $transactionCode): InertiaResponse
    {
        $order = Order::where('transaction_code', $transactionCode)
            ->with(['transactionItems', 'customer', 'orderStatus'])
            ->firstOrFail();

        $reviewedMenuItemIds = MenuItemReview::where('customer_id', $order->customer_id)
            ->where('transaction_id', $order->id)
            ->whereIn('menu_item_id', $order->transactionItems->pluck('menu_item_id'))
            ->pluck('menu_item_id')
            ->toArray();

        $order->transactionItems->transform(function ($item) use ($reviewedMenuItemIds) {
            $item->already_reviewed = in_array($item->menu_item_id, haystack: $reviewedMenuItemIds);
            return $item;
        });

        $order->latest_order_status = $order->orderStatus->last();

        return Inertia::render('customer/pages/orders/pages/detail', [
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

    public function checkPaymentStatus(string $transactionCode)
    {
        $serverKey = config('services.midtrans.server_key');
        $isProduction = config('services.midtrans.is_production');
        $baseUrl = $isProduction ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';

        $response = Http::withBasicAuth($serverKey, '')
            ->accept('application/json')
            ->get("{$baseUrl}/v2/{$transactionCode}/status");

        if (!$response->successful()) {
            return response()->json(['message' => 'Gagal mengambil status dari Midtrans'], 500);
        }

        $data = $response->json();
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        $transactionStatus = $data['transaction_status'];
        $fraudStatus = $data['fraud_status'] ?? null;
        $paymentReference = $data['transaction_id'] ?? null;

        if (
            in_array($transactionStatus, ['settlement', 'capture']) &&
            ($fraudStatus === null || $fraudStatus === 'accept') &&
            $transaction->payment_status !== PaymentStatusEnum::PAID
        ) {
            $transaction->update([
                'payment_status' => PaymentStatusEnum::PAID,
                'payment_reference' => $paymentReference,
            ]);

            $merchant = $transaction->merchant;
            if ($merchant) {
                $wallet = MerchantWallet::firstOrCreate(
                    ['merchant_id' => $merchant->id],
                    ['balance' => 0]
                );

                $merchantAmount = $transaction->subtotal_transaction_item - $transaction->discount_total;
                $wallet->increment('balance', $merchantAmount);
            }
        } elseif (in_array($transactionStatus, ['cancel', 'expire', 'deny'])) {
            $transaction->update([
                'payment_status' => PaymentStatusEnum::FAILED,
                'payment_reference' => $paymentReference,
            ]);
        }

        return redirect()->back();
    }

    public function orderHistoryAdmin(): InertiaResponse
    {
        $orders = Order::whereHas('latestOrderStatus', function ($query) {
            $query->where('status', OrderStatusEnum::COMPLETED->value);
        })
            ->with(['transactionItems', 'latestOrderStatus', 'merchant'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('admin/order-management/order-history/index', [
            'orders' => $orders,
        ]);
    }

    public function orderHistoryMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $orders = Order::where('merchant_id', $merchantId)
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', OrderStatusEnum::COMPLETED->value);
            })
            ->with(['transactionItems', 'latestOrderStatus'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('merchant/order-management/order-history/index', [
            'orders' => $orders,
        ]);
    }

    public function customerOrders(): InertiaResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $checkedOutOrders = Order::where('customer_id', $customerId)
            ->with(['transactionItems', 'latestOrderStatus', 'merchant', 'merchant.storeProfile', 'orderStatus'])
            ->orderBy('created_at', 'desc')
            ->where('checked_out_at', '!=', null)
            ->get();

        $notCheckedOutOrders = Order::where('customer_id', $customerId)
            ->with(['transactionItems', 'latestOrderStatus', 'merchant', 'merchant.storeProfile'])
            ->orderBy('created_at', 'desc')
            ->where('checked_out_at', null)
            ->get();

        return Inertia::render('customer/pages/orders/index', [
            'checkedOutOrders' => $checkedOutOrders,
            'notCheckedOutOrders' => $notCheckedOutOrders,
        ]);
    }
}
