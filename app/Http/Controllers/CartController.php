<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
use App\Models\Cart;
use App\Models\Customer;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CartController extends Controller
{
    public function indexCustomer(): RedirectResponse|InertiaResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        if (!$customer) {
            return redirect()->back()->withErrors('Anda bukan customer.');
        }

        $carts = Cart::with(['menuItem', 'menuItem.menuCategory', 'menuItem.merchant', 'customer'])
            ->where('customer_id', $customer->id)
            ->get();

        $merchantId = $carts->first()?->menuItem->merchant->id ?? null;

        if (!$merchantId) {
            $data = [];
        } else {
            $merchantData = $carts->first()->menuItem->merchant;

            $data = [
                'merchant_id' => $merchantData->id ?? null,
                'merchant_name' => $merchantData->business_name ?? 'Merchant tidak diketahui',
                'merchant_slug' => $merchantData->slug ?? null,
                'merchant_phone' => $merchantData->business_phone ?? null,
                'merchant_logo_photo' => $merchantData->storeProfile->logo_photo ?? null,
                'merchant_category' => $merchantData->businessCategory->name ?? null,
                'items' => $carts
                    ->map(function ($cart) {
                        return [
                            'id' => $cart->id,
                            'quantity' => $cart->quantity,
                            'unit_price' => $cart->unit_price,
                            'note' => $cart->note,
                            'menu_item' => [
                                'id' => $cart->menuItem->id,
                                'name' => $cart->menuItem->name,
                                'price' => $cart->menuItem->price,
                                'image_url' => $cart->menuItem->image_url,
                                'short_description' => $cart->menuItem->short_description,
                                'category' => $cart->menuItem->menuCategory->name ?? null,
                            ],
                        ];
                    })
                    ->values()
                    ->toArray(),
            ];
        }

        return Inertia::render('customer/pages/cart/index', [
            'carts' => $data,
        ]);
    }

    public function store(CartRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        if (!$customer) {
            return back()->withErrors([
                'unauthorized' => 'Hanya customer yang bisa menambahkan menu ke keranjang.',
            ]);
        }

        $customerId = $customer->id;
        $menuItem = MenuItem::findOrFail($request->menu_item_id);
        $merchantId = $menuItem->merchant_id;

        $existingMerchantId = Cart::where('customer_id', $customerId)->select('merchant_id')->distinct()->pluck('merchant_id')->first();
        if ($existingMerchantId && $existingMerchantId != $merchantId) {
            return back()->withErrors([
                'merchant_conflict' => 'Keranjang hanya boleh berisi menu dari satu merchant.',
            ]);
        }

        $cartItem = Cart::where('customer_id', $customerId)->where('menu_item_id', $menuItem->id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            Cart::create([
                'customer_id' => $customerId,
                'merchant_id' => $merchantId,
                'menu_item_id' => $menuItem->id,
                'quantity' => $request->quantity,
                'unit_price' => $menuItem->price,
            ]);
        }

        return back()->with([
            'success' => 'Item berhasil ditambahkan ke keranjang.',
        ]);
    }

    public function addedNote(Request $request, int $id): RedirectResponse
    {
        Cart::where('id', $id)->update([
            'note' => $request->note,
        ]);

        return back()->with('success', 'Catatan berhasil ditambahkan.');
    }

    public function clearCart(): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        if (!$customer) {
            return back()->withErrors(['error' => 'Customer tidak ditemukan.']);
        }

        Cart::where('customer_id', $customer->id)->delete();

        return back()->with('success', 'Keranjang berhasil dikosongkan.');
    }

    public function updateQuantity(Request $request, int $id): RedirectResponse
    {
        $cart = Cart::findOrFail($id);
        $increment = $request->input('increment', true);

        if ($increment) {
            $cart->increment('quantity');
        } elseif ($cart->quantity > 1) {
            $cart->decrement('quantity');
        } else {
            $cart->delete();
        }

        return redirect()->back()->with('success', 'Jumlah menu berhasil diubah.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();
        return redirect()->back()->with('success', 'Menu berhasil dihapus dari keranjang.');
    }

    public function destroyAll(int $merchantId): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        if ($customer) {
            Cart::where('customer_id', $customer->id)
                ->whereHas('menuItem', function ($query) use ($merchantId) {
                    $query->where('merchant_id', $merchantId);
                })
                ->delete();
        }

        return redirect()->back()->with('success', 'Menu berhasil dihapus dari keranjang.');
    }
}
