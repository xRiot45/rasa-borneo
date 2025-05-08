<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuItemRequest;
use App\Models\MenuItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MenuItemController extends Controller
{
    public function index_merchant(): Response
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $menuItems = MenuItem::withTrashed()->where('merchant_id', $merchantId)->get();
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
}
