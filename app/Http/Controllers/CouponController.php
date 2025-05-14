<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use App\Models\Merchant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CouponController extends Controller
{
    public function index_merchant(): InertiaResponse
    {
        return Inertia::render('merchant/promotion-management/coupons/index');
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('merchant/promotion-management/coupons/pages/form');
    }

    public function store(CouponRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $validated = $request->validated();

        Coupon::create(array_merge($validated, ['merchant_id' => $merchantId]));

        return redirect()->route('merchant.coupon.index_merchant')->with('success', 'Kupon berhasil ditambahkan.');
    }

    public function edit(int $id): InertiaResponse
    {
        $coupon = Coupon::findOrFail($id);
        return Inertia::render('merchant/promotion-management/coupons/pages/form', [
            'coupon' => $coupon,
        ]);
    }
}
