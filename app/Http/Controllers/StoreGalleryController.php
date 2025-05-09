<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGalleryRequest;
use App\Models\StoreGallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class StoreGalleryController extends Controller
{
    public function index_merchant(): Response
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $storeGalleries = StoreGallery::withTrashed()->where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/store-management/store-gallery/index', [
            'data' => $storeGalleries,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('merchant/store-management/store-gallery/pages/create');
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $validated = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');
            $filename = uniqid('store_gallery_') . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('store_gallery', $filename, 'public');

            $validated['image_url'] = '/' . 'storage/' . $path;
        }

        StoreGallery::create(
            array_merge($validated, [
                'merchant_id' => $merchantId,
            ]),
        );

        return redirect()->route('merchant.store-gallery.index_merchant')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(int $id): Response
    {
        $storeGallery = StoreGallery::findOrFail($id);
        return Inertia::render('merchant/store-management/store-gallery/pages/edit', [
            'storeGallery' => $storeGallery,
        ]);
    }

    public function update(StoreGalleryRequest $request, StoreGallery $storeGallery): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $oldImagePath = str_replace('/storage/', '', $storeGallery->image_url);

            if (Storage::disk('public')->exists($oldImagePath)) {
                Storage::disk('public')->delete($oldImagePath);
            }

            $image = $request->file('image_url');
            $filename = uniqid('store_gallery_') . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('store_gallery', $filename, 'public');

            $data['image_url'] = "/storage/{$path}";
        }

        $storeGallery->update($data);

        return redirect()->route('merchant.store-gallery.index_merchant')->with('success', 'Data berhasil diubah.');
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
