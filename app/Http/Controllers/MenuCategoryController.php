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
        $menuCategories = MenuCategory::withTrashed()->get();
        return Inertia::render('merchant/menu-management/menu-categories/index', [
            'data' => $menuCategories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('merchant/menu-management/menu-categories/pages/create');
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

    public function edit(MenuCategory $menuCategory): Response
    {
        return Inertia::render('merchant/menu-management/menu-categories/pages/edit', [
            'data' => $menuCategory,
        ]);
    }

    public function update(MenuCategoryRequest $request, MenuCategory $menuCategory): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchant = $authenticatedUser->merchant;

        $menuCategoryAlreadyExist = MenuCategory::where('name', $request->name)->where('merchant_id', $merchant->id)->where('id', '!=', $menuCategory->id)->exists();

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
