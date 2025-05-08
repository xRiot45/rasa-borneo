<?php

namespace App\Http\Controllers;

use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuCategoryController extends Controller
{
    public function index_merchant(): Response
    {
        $menuCategories = MenuCategory::withTrashed()->get();
        return Inertia::render('merchant/menu-management/menu-categories/index', [
            'data' => $menuCategories
        ]);
    }
}
