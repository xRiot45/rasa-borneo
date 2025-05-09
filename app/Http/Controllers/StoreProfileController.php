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

        // Upload logo_photo
        if ($request->hasFile('logo_photo') && $request->file('logo_photo')->isValid()) {
            $file = $request->file('logo_photo');
            $filename = uniqid('logo_') . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('store_logo_photo', $filename, 'public');
            $validated['logo_photo'] = '/storage/' . $path;
        }

        // Upload cover_photo
        if ($request->hasFile('cover_photo') && $request->file('cover_photo')->isValid()) {
            $file = $request->file('cover_photo');
            $filename = uniqid('cover_') . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('store_cover_photo', $filename, 'public');
            $validated['cover_photo'] = '/storage/' . $path;
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
