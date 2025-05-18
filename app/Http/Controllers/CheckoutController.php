<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Customer;
use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as IntertiaResponse;

class CheckoutController extends Controller
{
    public function index(): IntertiaResponse
    {
        return Inertia::render('customer/pages/checkout/index');
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

        $transaction = Transaction::create(
            array_merge([
                'customer_id' => $customerId,
            ]),
        );

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
