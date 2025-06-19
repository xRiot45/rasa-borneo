<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use App\Models\Merchant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CouponController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();
        $merchantId = $merchant->id;

        $coupons = Coupon::withTrashed()->where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/promotion-management/coupons/index', [
            'data' => $coupons,
        ]);
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

        $validated['start_date'] = Carbon::parse($validated['start_date'])->startOfDay();
        $validated['end_date'] = Carbon::parse($validated['end_date'])->endOfDay();

        Coupon::create(array_merge($validated, [
            'merchant_id' => $merchantId,
        ]));

        return redirect()->route('merchant.coupon.indexMerchant')->with('success', 'Kupon berhasil ditambahkan.');
    }


    public function edit(int $id): InertiaResponse
    {
        $coupon = Coupon::findOrFail($id);
        return Inertia::render('merchant/promotion-management/coupons/pages/form', [
            'coupon' => $coupon,
        ]);
    }

    public function update(CouponRequest $request, int $id): RedirectResponse
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->update($request->validated());
        return redirect()->route('merchant.coupon.indexMerchant')->with('success', 'Kupon berhasil diperbarui.');
    }

    public function softDelete(int $id): RedirectResponse
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();
        return redirect()->route('merchant.coupon.indexMerchant')->with('success', 'Kupon berhasil dihapus.');
    }

    public function restore(int $id): RedirectResponse
    {
        $coupon = Coupon::withTrashed()->findOrFail($id);
        $coupon->restore();
        return redirect()->route('merchant.coupon.indexMerchant')->with('success', 'Kupon berhasil dikembalikan.');
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $coupon = Coupon::withTrashed()->findOrFail($id);
        $coupon->forceDelete();
        return redirect()->route('merchant.coupon.indexMerchant')->with('success', 'Kupon berhasil dihapus permanen.');
    }
}
