<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Notifications\MerchantVerifiedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MerchantController extends Controller
{
    public function index(): Response
    {
        $merchants = Merchant::withTrashed()->with('businessCategory')->get();
        return Inertia::render('admin/users-management/merchants/index', [
            'data' => $merchants,
        ]);
    }

    public function index_customer(): Response
    {
        $merchants = Merchant::with('businessCategory', 'user', 'storeProfile')->where('is_verified', 1)->get();
        return Inertia::render('customer/pages/merchant/index', [
            'data' => $merchants,
        ]);
    }

    public function show(Merchant $merchant): Response
    {
        $merchant->load('businessCategory', 'user', 'storeProfile', 'storeGallery', 'storeOperatingHour');
        return Inertia::render('admin/users-management/merchants/pages/show', [
            'data' => $merchant,
        ]);
    }

    public function showForCustomer(Merchant $merchant): Response
    {
        $merchant->load('businessCategory', 'user', 'storeProfile', 'storeGalleries', 'storeOperatingHours');
        return Inertia::render('customer/pages/merchant/detail/index', [
            'data' => $merchant,
        ]);
    }

    public function verifyMerchant(Merchant $merchant): RedirectResponse
    {
        $merchant->update(['is_verified' => true]);

        $user = $merchant->user()->first();

        $merchant->user->notify(new MerchantVerifiedNotification($merchant));

        $user
            ->forceFill([
                'email_verified_at' => now(),
            ])
            ->save();

        return redirect()
            ->back()
            ->with(['success' => 'Usaha berhasil diverifikasi']);
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
