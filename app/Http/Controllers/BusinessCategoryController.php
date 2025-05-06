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

    public function edit(int $businessCategoryId): Response
    {
        $businesCategory = BusinessCategory::findOrFail($businessCategoryId);
        return Inertia::render('admin/master-data/business-category/pages/edit', [
            'data' => $businesCategory
        ]);
    }

    public function update(BusinessCategoryRequest $request, int $businessCategoryId): RedirectResponse
    {
        $businessCategory = BusinessCategory::findOrFail($businessCategoryId);
        $businessCategory->update($request->validated());
        return redirect()
            ->route('admin.business-category.index')
            ->with([
                'success' => 'Update business category successfully',
            ]);
    }

    public function softDelete(int $businessCategoryId): RedirectResponse
    {
        $businessCategory = BusinessCategory::findOrFail($businessCategoryId);
        $businessCategory->delete();
        return redirect()
            ->route('admin.business-category.index')
            ->with([
                'success' => 'Delete business category successfully',
            ]);
    }

    public function restore(int $businessCategoryId): RedirectResponse
    {
        $businessCategory = BusinessCategory::withTrashed()->findOrFail($businessCategoryId);
        $businessCategory->restore();
        return redirect()
            ->route('admin.business-category.index')
            ->with([
                'success' => 'Restore business category successfully',
            ]);
    }
}
