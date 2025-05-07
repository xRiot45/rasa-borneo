<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use App\Models\User;
use App\Notifications\MerchantVerifiedNotification;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MerchantController extends Controller
{
    public function index(): Response
    {
        // $merchants = User::with('merchant')
        //     ->whereHas('roles', function ($query) {
        //         $query->where('name', 'merchant');
        //     })
        //     ->get();

        $merchants = Merchant::withTrashed()->with('businessCategory')->get();

        return Inertia::render('admin/users-management/merchants/index', [
            'data' => $merchants,
        ]);
    }

    public function show(Merchant $merchant): Response
    {
        $merchant->load('businessCategory', 'user');
        return Inertia::render('admin/users-management/merchants/pages/show', [
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
}
