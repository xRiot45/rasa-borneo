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
                'name' => 'Kategori Menu sudah ada',
            ]);
        }

        MenuCategory::create([
            'name' => $request->name,
            'merchant_id' => $merchant->id,
        ]);

        return redirect()->route('merchant.menu-categories.index')->with('success', 'Category created successfully');
    }
}
