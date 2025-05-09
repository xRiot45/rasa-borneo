<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProfileRequest;
use App\Models\StoreProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class StoreProfileController extends Controller
{
    public function index_merchant(): Response
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $storeProfile = StoreProfile::where('merchant_id', $merchantId)->with('merchant')->first();
        return Inertia::render('merchant/store-management/store-profile/index', [
            'storeProfile' => $storeProfile,
        ]);
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

    public function update(StoreProfileRequest $request, int $id): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $storeProfile = StoreProfile::where('merchant_id', $merchantId)
            ->findOrFail($id);

        $validated = $request->validated();

        $nullableFields = [
            'website_url',
            'instagram_url',
            'facebook_url',
            'twitter_url',
            'tiktok_url',
            'whatsapp_url',
            'latitude',
            'longitude',
        ];

        foreach ($nullableFields as $field) {
            if (array_key_exists($field, $validated) && $validated[$field] === '') {
                $validated[$field] = null;
            }
        }

        // Proses upload logo jika ada
        if ($request->hasFile('logo_photo') && $request->file('logo_photo')->isValid()) {
            // Hapus file lama jika ada
            if ($storeProfile->logo_photo) {
                $oldImagePath = str_replace('/storage/', '', $storeProfile->logo_photo);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Simpan file baru
            $logoPhoto = $request->file('logo_photo');
            $logoPhotoFilename = uniqid('logo_') . '.' . $logoPhoto->getClientOriginalExtension();
            $logoPhotoPath = $logoPhoto->storeAs('store_logo_photo', $logoPhotoFilename, 'public');
            $validated['logo_photo'] = '/storage/' . $logoPhotoPath;
        } else {
            // Jika tidak upload baru, tetap pakai yang lama
            $validated['logo_photo'] = $storeProfile->logo_photo;
        }

        // Proses upload cover jika ada
        if ($request->hasFile('cover_photo') && $request->file('cover_photo')->isValid()) {
            if ($storeProfile->cover_photo) {
                $oldImagePath = str_replace('/storage/', '', $storeProfile->cover_photo);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            $coverPhoto = $request->file('cover_photo');
            $coverPhotoFilename = uniqid('cover_') . '.' . $coverPhoto->getClientOriginalExtension();
            $coverPhotoPath = $coverPhoto->storeAs('store_cover_photo', $coverPhotoFilename, 'public');
            $validated['cover_photo'] = '/storage/' . $coverPhotoPath;
        } else {
            $validated['cover_photo'] = $storeProfile->cover_photo;
        }

        // Update database
        $storeProfile->update($validated);

        return redirect()
            ->route('merchant.store-profile.index_merchant')
            ->with(['success' => 'Profil toko berhasil diperbarui.']);
    }
}
