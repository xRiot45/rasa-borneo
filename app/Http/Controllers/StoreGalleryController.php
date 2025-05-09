<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGalleryRequest;
use App\Models\StoreGallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
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
        return Inertia::render('merchant/store-management/store-gallery/pages/form');
    }

    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $validated = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');
            $filename = uniqid('logo_') . '.' . $file->getClientOriginalExtension();
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
}
