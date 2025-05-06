<?php

namespace App\Http\Controllers;

use App\Http\Requests\BusinessCategoryRequest;
use App\Models\BusinessCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessCategoryController extends Controller
{
    public function index(): Response
    {
        $businessCategory = BusinessCategory::all();
        return Inertia::render('admin/master-data/business-category/index', [
            'data' => $businessCategory
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/master-data/business-category/pages/create');
    }

    public function store(BusinessCategoryRequest $request): RedirectResponse
    {
        BusinessCategory::create($request->validated());
        return redirect()
            ->route('admin.business-category.index')
            ->with(['success' => 'Kategori bisnis berhasil ditambahkan']);
    }
}
