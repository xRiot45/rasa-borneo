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
    private function getCartItems(): array|RedirectResponse
    {
        $user = Auth::user();

        $merchant = Merchant::where('user_id', $user->id)->with('storeProfile')->first();
        $customer = Customer::where('user_id', $user->id)->first();

        if (!$merchant && !$customer) {
            return redirect()->back()->withErrors('Anda bukan merchant atau customer.');
        }

        // Ambil cart berdasarkan apakah dia merchant atau customer
        $carts = Cart::with(['menuItem', 'menuItem.menuCategory', 'menuItem.merchant', 'customer'])
            ->when($merchant?->id, fn($query) => $query->where('merchant_id', $merchant->id))
            ->when($customer?->id, fn($query) => $query->where('customer_id', $customer->id))
            ->get();

        // Grouping berdasarkan merchant_id
        $grouped = $carts->groupBy(fn($cart) => $cart->menuItem->merchant->id ?? 'unknown');

        // Format ulang
        $result = $grouped
            ->map(function ($items, $merchantId) {
                $firstItem = $items->first();
                $merchant = $firstItem->menuItem->merchant;

                return [
                    'merchant_id' => $merchant->id ?? null,
                    'merchant_name' => $merchant->business_name ?? 'Merchant tidak diketahui',
                    'merchant_slug' => $merchant->slug ?? null,
                    'merchant_phone' => $merchant->business_phone ?? null,
                    'merchant_logo_photo' => $merchant->storeProfile->logo_photo ?? null,
                    'merchant_category' => $merchant->businessCategory->name ?? null,
                    'items' => $items
                        ->map(function ($cart) {
                            return [
                                'id' => $cart->id,
                                'quantity' => $cart->quantity,
                                'unit_price' => $cart->unit_price,
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
                        ->values(),
                ];
            })
            ->values();

        return $result->toArray();
    }

    public function index_customer(): RedirectResponse|Response
    {
        $data = $this->getCartItems();
        $user = Auth::user();
        // $customer = Customer::where('user_id', $user->id)->first();

        if ($data instanceof RedirectResponse) {
            return $data;
        }

        return Inertia::render('customer/pages/cart/index', [
            'carts' => $data,
            // 'customer' => $customer
        ]);
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

        $cart = Cart::where('menu_item_id', $request->menu_item_id)->when($merchantId, fn($query) => $query->where('merchant_id', $merchantId))->when($customerId, fn($query) => $query->where('customer_id', $customerId))->first();

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

    public function destroyByMerchant(int $merchantId): RedirectResponse
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
