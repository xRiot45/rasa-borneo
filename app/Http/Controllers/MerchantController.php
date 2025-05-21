<?php

namespace App\Http\Controllers;

use App\Models\BusinessCategory;
use App\Models\Merchant;
use App\Notifications\MerchantVerifiedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class MerchantController extends Controller
{
    public function index(): InertiaResponse
    {
        $merchants = Merchant::withTrashed()->with('businessCategory')->get();
        return Inertia::render('admin/users-management/merchants/index', [
            'data' => $merchants,
        ]);
    }

    public function index_customer(Request $request): InertiaResponse
    {
        $category = $request->query('category');

        $merchants = Merchant::with('businessCategory', 'user', 'storeProfile')
            ->where('is_verified', 1)
            ->when($category, function ($query, $category) {
                $query->whereHas('businessCategory', function ($q) use ($category) {
                    $q->where('name', $category);
                });
            })
            ->get();

        return Inertia::render('customer/pages/merchant/index', [
            'data' => $merchants,
            'selectedCategory' => $category,
        ]);
    }

    public function merchant_categories(): InertiaResponse
    {
        $merchantCategories = BusinessCategory::all();
        return Inertia::render('customer/pages/merchant-categories/index', [
            'data' => $merchantCategories,
        ]);
    }

    public function show(int $id): InertiaResponse
    {
        $merchant = Merchant::withTrashed()->findOrFail($id);

        $merchant->load('businessCategory', 'user');
        return Inertia::render('admin/users-management/merchants/pages/show', [
            'data' => $merchant,
        ]);
    }

    public function showForCustomer(Merchant $merchant): InertiaResponse
    {
        $merchant->load('businessCategory', 'user', 'storeProfile', 'storeGalleries', 'storeOperatingHours', 'menuCategories', 'menuItems.menuCategory');
        return Inertia::render('customer/pages/merchant/detail/index', [
            'data' => $merchant,
        ]);
    }

    public function verifyMerchant(int $int): RedirectResponse
    {
        $merchant = Merchant::withTrashed()->findOrFail($int);

        $merchant->update(['is_verified' => true]);

        $user = $merchant->user()->first();

        $merchant->user->notify(new MerchantVerifiedNotification($merchant));

        $user
            ->forceFill([
                'email_verified_at' => now(),
            ])
            ->save();

        return redirect()->back(303)->with('success', 'Usaha berhasil diverifikasi');
    }

    public function softDelete(Merchant $merchant): RedirectResponse
    {
        $user = $merchant->user()->first();

        $user->delete();
        $merchant->delete();
        return redirect()
            ->back()
            ->with(['success' => 'Merchant berhasil dihapus sementara']);
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $merchant = Merchant::onlyTrashed()->with('user')->findOrFail($id);
        if ($merchant->user()->withTrashed()->exists()) {
            $merchant->user()->withTrashed()->first()->forceDelete();
        }

        if ($merchant->id_card_photo) {
            $path = str_replace('/storage/', '', $merchant->id_card_photo);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        $merchant->forceDelete();
        return redirect()
            ->back()
            ->with(['success' => 'Merchant berhasil dihapus permanen']);
    }

    public function restore(int $id): RedirectResponse
    {
        $merchant = Merchant::onlyTrashed()->with('user')->findOrFail($id);
        if ($merchant->user()->withTrashed()->exists()) {
            $merchant->user()->withTrashed()->first()->restore();
        }

        $merchant->restore();

        return redirect()
            ->back()
            ->with(['success' => 'Merchant berhasil direstore']);
    }
}
