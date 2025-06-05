<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Merchant;
use App\Models\MerchantReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class MerchantReviewController extends Controller
{
    public function storeReview(Request $request, int $merchantId): RedirectResponse
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:500',
        ]);

        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        MerchantReview::create([
            'customer_id' => $customer->id,
            'merchant_id' => $merchantId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        return redirect()->back()->with('success', 'Review merchant berhasil!');
    }

    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();

        $merchantReviews = MerchantReview::with('customer.user')
            ->where('merchant_id', $merchant->id)
            ->get();

        return Inertia::render('merchant/customer-interaction/merchant-review/index', [
            'merchantReviews' => $merchantReviews
        ]);
    }
}
