<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MenuItemReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuItemReviewController extends Controller
{
    public function storeReview(Request $request, int $menuItemId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        MenuItemReview::create([
            'customer_id' => $customer->id,
            'menu_item_id' => $menuItemId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('success', 'Review menu item berhasil!');
    }
}
