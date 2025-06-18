<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuCategoryRequest;
use App\Models\MenuCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class MenuCategoryController extends Controller
{
    public function index_merchant(): Response
    {
        $user = Auth::user();
        $merchantId = $user->merchant->id;

        $menuCategories = MenuCategory::withTrashed()->where('merchant_id', $merchantId)->get();
        return Inertia::render('merchant/menu-management/menu-categories/index', [
            'data' => $menuCategories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('merchant/menu-management/menu-categories/pages/form');
    }

    public function store(MenuCategoryRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchant = $authenticatedUser->merchant;

        $menuCategoryAlreadyExist = MenuCategory::where('name', $request->name)->where('merchant_id', $merchant->id)->exists();

        if ($menuCategoryAlreadyExist) {
            throw ValidationException::withMessages([
                'name' => 'Kategori dengan nama tersebut sudah ada.',
            ]);
        }

        MenuCategory::create([
            'name' => $request->name,
            'merchant_id' => $merchant->id,
        ]);

        return redirect()->route('merchant.menu-categories.index')->with('success', 'Category created successfully');
    }

    public function edit(int $id): Response
    {
        $menuCategory = MenuCategory::findOrFail($id);
        return Inertia::render('merchant/menu-management/menu-categories/pages/form', [
            'menuCategory' => $menuCategory,
        ]);
    }

    public function update(MenuCategoryRequest $request, int $id): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchant = $authenticatedUser->merchant;

        $menuCategory = MenuCategory::findOrFail($id);

        if ($menuCategory->merchant_id != $merchant->id) {
            abort(403, 'Unauthorized action.');
        }

        $menuCategoryAlreadyExist = MenuCategory::where('name', $request->name)
            ->where('merchant_id', $merchant->id)
            ->where('id', '!=', $menuCategory->id)
            ->exists();

        if ($menuCategoryAlreadyExist) {
            throw ValidationException::withMessages([
                'name' => 'Kategori dengan nama tersebut sudah ada.',
            ]);
        }

        $menuCategory->update([
            'name' => $request->name,
        ]);

        return redirect()->route('merchant.menu-categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function softDelete(MenuCategory $menuCategory): RedirectResponse
    {
        $menuCategory->delete();
        return redirect()
            ->back()
            ->with(['success' => 'Kategori berhasil dihapus sementara']);
    }

    public function restore(int $id): RedirectResponse
    {
        $menuCategory = MenuCategory::onlyTrashed()->findOrFail($id);
        $menuCategory->restore();
        return redirect()->route('merchant.menu-categories.index')->with('success', 'Kategori berhasil dipulihkan');
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $menuCategory = MenuCategory::onlyTrashed()->findOrFail($id);
        $menuCategory->forceDelete();
        return redirect()->route('merchant.menu-categories.index')->with('success', 'Kategori berhasil dihapus permanen');
    }
}
