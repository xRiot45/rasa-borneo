<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuItemRequest;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MenuItemController extends Controller
{
    public function index_merchant(): Response
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $menuItems = MenuItem::withTrashed()->where('merchant_id', $merchantId)->with('menuCategory')->get();
        return Inertia::render('merchant/menu-management/menu-items/index', [
            'data' => $menuItems,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('merchant/menu-management/menu-items/pages/create');
    }

    public function store(MenuItemRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $validated = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('foto_menu', $filename, 'public');

            $validated['image_url'] = '/' . 'storage/' . $path;
        }

        MenuItem::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'image_url' => $validated['image_url'] ?? null,
            'status' => $validated['status'],
            'short_description' => $validated['short_description'],
            'menu_category_id' => $validated['menu_category_id'],
            'merchant_id' => $merchantId,
            'is_recommended' => $validated['is_recommended'],
        ]);

        return redirect()
            ->route('merchant.menu-items.index')
            ->with(['success' => 'Menu item berhasil ditambahkan']);
    }

    public function edit(MenuItem $menuItem): Response
    {
        return Inertia::render('merchant/menu-management/menu-items/pages/edit', [
            'menuItem' => $menuItem,
        ]);
    }

    public function update(MenuItemRequest $request, MenuItem $menuItem): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $validated = $request->validated();

        if ($request->hasFile('image_url') && $request->file('image_url')->isValid()) {
            if ($menuItem->image_url) {
                $oldImagePath = str_replace('/storage/', '', $menuItem->image_url);
                if (Storage::disk('public')->exists($oldImagePath)) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('foto_menu', $filename, 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $menuItem->update([
            'name' => $validated['name'] ?? $menuItem->name,
            'price' => $validated['price'] ?? $menuItem->price,
            'image_url' => $validated['image_url'] ?? $menuItem->image_url,
            'status' => $validated['status'] ?? $menuItem->status,
            'short_description' => $validated['short_description'] ?? $menuItem->short_description,
            'menu_category_id' => $validated['menu_category_id'] ?? $menuItem->menu_category_id,
            'is_recommended' => $validated['is_recommended'] ?? $menuItem->is_recommended,
        ]);

        return redirect()
            ->route('merchant.menu-items.index')
            ->with(['success' => 'Menu item berhasil diperbarui']);
    }

    public function softDelete(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->delete();
        return redirect()
            ->back()
            ->with(['success' => 'Menu item berhasil dihapus sementara']);
    }
}
