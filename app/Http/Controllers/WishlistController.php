<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Wishlist;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index_customer(): Response
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $wishlists = Wishlist::with('menuItem.menuCategory', 'menuItem.merchant')->where('customer_id', $customerId)->get();

        return Inertia::render('customer/pages/wishlist/index', [
            'data' => $wishlists,
        ]);
    }

    public function toggle(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $request->validate([
            'menu_item_id' => 'required|exists:menu_items,id',
        ]);

        $wishlist = Wishlist::where('customer_id', $customerId)->where('menu_item_id', $request->menu_item_id)->first();

        if ($wishlist) {
            $wishlist->delete();
            return redirect()->back()->with('status', false);
        } else {
            Wishlist::create([
                'customer_id' => $customerId,
                'menu_item_id' => $request->menu_item_id,
            ]);
            return redirect()->back()->with('status', true);
        }
    }
}
