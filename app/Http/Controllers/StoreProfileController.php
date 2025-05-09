<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Models\StoreProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class StoreProfileController extends Controller
{
    public function index_merchant(): Response
    {
        return Inertia::render('merchant/store-management/store-profile/index');
    }

    public function create(): Response
    {
        return Inertia::render('merchant/store-management/store-profile/pages/form');
    }

    public function store(StoreProfileRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        if (StoreProfile::where('merchant_id', $merchantId)->exists()) {
            return redirect()
                ->back()
                ->withErrors(['Store profile sudah ada untuk merchant ini.']);
        }

        $validated = $request->validated();

        $logoPhoto = $request->file('logo_photo');
        if ($logoPhoto && $logoPhoto->isValid()) {
            $logoPhotoFilename = uniqid('logo_') . '.' . $logoPhoto->getClientOriginalExtension();
            $logoPhotoPath = $logoPhoto->storeAs('store_logo_photo', $logoPhotoFilename, 'public');
            $validated['logo_photo'] = '/storage/' . $logoPhotoPath;
        }

        $coverPhoto = $request->file('cover_photo');
        if ($coverPhoto && $coverPhoto->isValid()) {
            $coverPhotoFilename = uniqid('cover_') . '.' . $coverPhoto->getClientOriginalExtension();
            $coverPhotoPath = $coverPhoto->storeAs('store_cover_photo', $coverPhotoFilename, 'public');
            $validated['cover_photo'] = '/storage/' . $coverPhotoPath;
        }

        StoreProfile::create(
            array_merge($validated, [
                'merchant_id' => $merchantId,
            ]),
        );

        return redirect()
            ->route('merchant.store-profile.index_merchant')
            ->with(['success' => 'Profil toko berhasil ditambahkan.']);
    }

    public function edit(int $id): Response
    {
        $storeProfile = StoreProfile::findOrFail($id);
        return Inertia::render('merchant/store-management/store-profile/pages/form', [
            'storeProfile' => $storeProfile,
        ]);
    }
}
