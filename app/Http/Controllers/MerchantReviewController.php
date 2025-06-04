<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Merchant;
use App\Models\MerchantReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
