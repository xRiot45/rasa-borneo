<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Coupon;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\Fee;
use App\Models\Table;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CheckoutController extends Controller
{
    public function index(string $transactionCode): InertiaResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $transaction = Transaction::with('transactionItems', 'coupon')->where('transaction_code', $transactionCode)->first();
        $coupons = Coupon::where('is_active', true)->where('merchant_id', $transaction->merchant_id)->get();
        $tables = Table::where('merchant_id', $transaction->merchant_id)->get();
        $fees = Fee::whereIn('type', ['delivery_fee', 'application_service_fee'])
            ->get()
            ->keyBy('type');

        $customerAddress = CustomerAddress::where('customer_id', $customerId)->get();

        return Inertia::render('customer/pages/checkout/index', [
            'transaction' => $transaction,
            'coupons' => $coupons,
            'tables' => $tables,
            'fees' => $fees,
            'customerAddress' => $customerAddress,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        if (!$customer) {
            return redirect()->back()->withErrors('Anda bukan customer.');
        }

        $customerId = $customer->id;
        $cartItemIds = $request->input('cart_item_ids', []);

        if (empty($cartItemIds)) {
            return redirect()->back()->withErrors('Tidak ada item yang dipilih untuk checkout.');
        }

        $cartItems = Cart::where('customer_id', $customerId)->whereIn('id', $cartItemIds)->get();

        if ($cartItems->isEmpty()) {
            return redirect()->back()->withErrors('Item yang dipilih tidak ditemukan di keranjang Anda.');
        }

        // Ambil fee
        $fees = Fee::whereIn('type', ['delivery_fee', 'application_service_fee'])->pluck('amount', 'type');
        $applicationServiceFee = $fees['application_service_fee'] ?? 0;

        // Hitung subtotal
        $subtotalTransactionItems = 0;
        foreach ($cartItems as $cartItem) {
            $menuItem = $cartItem->menuItem;
            if ($menuItem) {
                $subtotalTransactionItems += $cartItem->quantity * $menuItem->price;
            }
        }

        $merchantId = $cartItems->first()->merchant_id;

        $transaction = Transaction::create([
            'customer_id' => $customerId,
            'merchant_id' => $merchantId,
            'application_service_fee' => $applicationServiceFee,
            'subtotal_transaction_item' => $subtotalTransactionItems,
        ]);

        foreach ($cartItems as $cartItem) {
            $menuItem = $cartItem->menuItem;

            if (!$menuItem) {
                continue;
            }

            TransactionItem::create([
                'transaction_id' => $transaction->id,
                'menu_item_id' => $menuItem->id,
                'merchant_id' => $cartItem->merchant_id,
                'menu_item_name' => $menuItem->name,
                'menu_item_price' => $menuItem->price,
                'menu_item_image_url' => $menuItem->image_url,
                'menu_item_category' => $menuItem->menuCategory->name,
                'quantity' => $cartItem->quantity,
                'note' => $cartItem->note,
                'subtotal' => $cartItem->quantity * $menuItem->price,
            ]);
        }

        Cart::where('customer_id', $customerId)->whereIn('id', $cartItemIds)->delete();

        return redirect()->route('checkout.index', ['transactionCode' => $transaction->transaction_code]);
    }
}
