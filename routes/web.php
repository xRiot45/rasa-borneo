<?php

use App\Http\Controllers\BusinessCategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManageRolePermissionController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Admin
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index_admin'])->name('admin.dashboard');

    Route::prefix('/admin/manajemen-kontrol-akses')->group(function () {
        // Roles
        Route::prefix('/roles')
            ->controller(RoleController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.roles.index');
                Route::get('/create', 'create')->name('admin.roles.create');
                Route::post('/create', 'store')->name('admin.roles.store');
                Route::get('/edit/{id}', 'edit')->name('admin.roles.edit');
                Route::put('/edit/{id}', 'update')->name('admin.roles.update');
                Route::delete('/delete/{id}', 'destroy')->name('admin.roles.destroy');
                Route::delete('/delete-all', 'destroy_all')->name('admin.roles.destroy_all');
            });

        // Permissions
        Route::prefix('/permissions')
            ->controller(PermissionController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.permissions.index');
                Route::get('/create', 'create')->name('admin.permissions.create');
                Route::post('/create', 'store')->name('admin.permissions.store');
                Route::get('/edit/{id}', 'edit')->name('admin.permissions.edit');
                Route::put('/edit/{id}', 'update')->name('admin.permissions.update');
                Route::delete('/delete/{id}', 'destroy')->name('admin.permissions.destroy');
                Route::delete('/delete-all', 'destroy_all')->name('admin.permissions.destroy_all');
            });

        // Role Has Permissions
        Route::prefix('/manage-role-permissions')
            ->controller(ManageRolePermissionController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.manage-role-permission.index');
                Route::get('/create', 'create')->name('admin.manage-role-permission.create');
                Route::post('/create', 'store')->name('admin.manage-role-permission.store');
                Route::get('/edit/{id}', 'edit')->name('admin.manage-role-permission.edit');
                Route::put('/edit/{id}', 'update')->name('admin.manage-role-permission.update');
            });
    });

    Route::prefix('/admin/master-data')->group(function () {
        // Business Category
        Route::prefix('/business-categories')
            ->controller(BusinessCategoryController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.business-category.index');
                Route::get('/create', 'create')->name('admin.business-category.create');
                Route::post('/create', 'store')->name('admin.business-category.store');
                Route::get('/edit/{id}', 'edit')->name('admin.business-category.edit');
                Route::put('/edit/{id}', 'update')->name('admin.business-category.update');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('admin.business-category.softDelete');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('admin.business-category.forceDelete');
                Route::patch('/restore/{id}', 'restore')->name('admin.business-category.restore');
            });
    });

    Route::prefix('/admin/users-management')->group(function () {
        // All Users
        Route::prefix('/all-users')
            ->controller(UserController::class)
            ->group(function () {
                Route::get('/', 'index_all_users')->name('admin.all-users.index');
                Route::get('/create', 'create')->name('admin.all-users.create');
                Route::post('/create', 'store')->name('admin.all-users.store');
                Route::get('/edit/{id}', 'edit')->name('admin.all-users.edit');
                Route::put('/edit/{id}', 'update')->name('admin.all-users.update');
                Route::delete('/delete/{id}', 'destroy')->name('admin.all-users.destroy');
            });

        // Customer
        Route::prefix('/customers')
            ->controller(CustomerController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.customers.index');
                Route::get('/show/{customer}', 'show')->name('admin.customers.show');
                // Route::delete('/soft-delete/{customer}', 'softDelete')->name('admin.customers.softDelete');
                // Route::delete('/force-delete/{customer}', 'forceDelete')->name('admin.customers.forceDelete');
                // Route::patch('/restore/{customer}', 'restore')->name('admin.customers.restore');
            });

        // Merchant
        Route::prefix('/merchants')
            ->controller(MerchantController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.merchants.index');
                Route::get('/show/{merchant}', 'show')->name('admin.merchants.show');
                Route::put('/verify/{merchant}', 'verifyMerchant')->name('admin.merchants.verify');
                Route::delete('/soft-delete/{merchant}', 'softDelete')->name('admin.merchants.softDelete');
                Route::delete('/force-delete/{merchant}', 'forceDelete')->name('admin.merchants.forceDelete');
                Route::patch('/restore/{merchant}', 'restore')->name('admin.merchants.restore');
            });
    });
});

Route::middleware(['auth', 'verified', 'role:merchant'])->group(function () {
    Route::get('/merchant/dashboard', [DashboardController::class, 'index_merchant'])->name('merchant.dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
