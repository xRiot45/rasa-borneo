<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGalleryRequest;
use App\Models\StoreGallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class StoreGalleryController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $storeGalleries = StoreGallery::withTrashed()->where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/pages/store-management/store-gallery/index', [
            'data' => $storeGalleries,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('merchant/pages/store-management/store-gallery/pages/form');
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $validated = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('merchant_assets/store_gallery', $filename, 'public');

            $validated['image_url'] = '/' . 'storage/' . $path;
        }

        StoreGallery::create(
            array_merge($validated, [
                'merchant_id' => $merchantId,
            ]),
        );

        return redirect()->route('merchant.store-gallery.indexMerchant')->with('success', 'Data berhasil ditambahkan.');
    }

    public function update(StoreGalleryRequest $request, int $id): RedirectResponse
    {
        $storeGallery = StoreGallery::findOrFail($id);
        $validated = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            if ($storeGallery->image_url) {
                $oldImagePath = str_replace('/storage/', '', $storeGallery->image_url);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('merchant_assets/store_gallery', $filename, 'public');

            $validated['image_url'] = '/' . 'storage/' . $path;
        }

        $storeGallery->update($validated);

        return redirect()->route('merchant.store-gallery.indexMerchant')->with('success', 'Data berhasil diperbarui.');
    }


    public function edit(int $id): InertiaResponse
    {
        $storeGallery = StoreGallery::findOrFail($id);
        return Inertia::render('merchant/pages/store-management/store-gallery/pages/form', [
            'storeGallery' => $storeGallery,
        ]);
    }

    public function softDelete(int $id): RedirectResponse
    {
        StoreGallery::findOrFail($id)->delete();
        return redirect()
            ->back()
            ->with(['success' => 'Galeri Toko berhasil dihapus sementara']);
    }

    public function restore(int $id): RedirectResponse
    {
        StoreGallery::withTrashed()->findOrFail($id)->restore();
        return redirect()
            ->back()
            ->with(['success' => 'Galeri Toko berhasil dipulihkan']);
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $storeGallery = StoreGallery::withTrashed()->findOrFail($id);
        if ($storeGallery->image_url) {
            $oldImagePath = str_replace('/storage/', '', $storeGallery->image_url);
            if (Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        $storeGallery->forceDelete();

        return redirect()
            ->back()
            ->with(['success' => 'Galeri Toko berhasil dihapus permanen']);
    }
}
