<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\Cart;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\Merchant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index_customer(): Response
    {
        return Inertia::render('customer/pages/cart/index');
    }

    public function store(CartRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchant = Merchant::where('user_id', $authenticatedUser->id)->first();
        $customer = Customer::where('user_id', $authenticatedUser->id)->first();

        $merchantId = $merchant?->id;
        $customerId = $customer->id;

        if (!$customerId && !$merchantId) {
            return back()->withErrors('Anda bukan Merchant atau customer.');
        }

        $menuItem = MenuItem::findOrFail($request->menu_item_id);

        $cart = Cart::where('menu_item_id', $request->menu_item_id)
            ->when($merchantId, fn($query) => $query->where('merchant_id', $merchantId))
            ->when($customerId, fn($query) => $query->where('customer_id', $customerId))
            ->first();

        if ($cart) {
            $cart->increment('quantity', $request->quantity);
        } else {
            Cart::create([
                'customer_id' => $customerId,
                'merchant_id' => $merchantId,
                'menu_item_id' => $request->menu_item_id,
                'quantity' => $request->quantity,
                'unit_price' => $menuItem->price,
            ]);
        }

        return back()->with(['success' => 'Item berhasil ditambahkan ke keranjang.']);
    }
}
