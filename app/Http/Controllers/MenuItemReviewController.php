<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\MenuItemReview;
use App\Models\Merchant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class MenuItemReviewController extends Controller
{
    public function storeReview(Request $request, int $transactionId, int $menuItemId): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        $existingReview = MenuItemReview::where('customer_id', $customer->id)
            ->where('menu_item_id', $menuItemId)
            ->where('transaction_id', $transactionId)
            ->first();

        if ($existingReview) {
            return redirect()->back()->with('error', 'Anda sudah memberikan review untuk menu ini.');
        }

        MenuItemReview::create([
            'customer_id' => $customer->id,
            'menu_item_id' => $menuItemId,
            'transaction_id' => $transactionId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('success', 'Review menu item berhasil!');
    }

    public function showReviewForCustomer(int $menuItemId): InertiaResponse
    {
        $menuItem = MenuItem::with('reviews', 'reviews.customer.user')->findOrFail($menuItemId);

        return Inertia::render('customer/pages/menu/pages/review', [
            'data' => $menuItem->toArray(),
        ]);
    }

    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();

        $menuReviews = MenuItemReview::with('customer.user', 'menuItem.menuCategory')
            ->whereHas('menuItem', function ($query) use ($merchant) {
                $query->where('merchant_id', $merchant->id);
            })
            ->get();


        return Inertia::render('merchant/customer-interaction/menu-review/index', [
            'menuReviews' => $menuReviews
        ]);
    }

    public function indexAdmin(): InertiaResponse
    {
        $menuReviews = MenuItemReview::with('customer.user', 'menuItem.menuCategory', 'menuItem.merchant')
            ->get();

        return Inertia::render('admin/customer-interaction/menu-review/index', [
            'menuReviews' => $menuReviews
        ]);
    }

    public function destroy(int $menuReviewId): RedirectResponse
    {
        MenuItemReview::find($menuReviewId)->delete();
        return redirect()->back()->with('success', 'Review menu item berhasil dihapus!');
    }
}
