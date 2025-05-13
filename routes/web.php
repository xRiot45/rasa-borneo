<?php

use App\Http\Controllers\BusinessCategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManageRolePermissionController;
use App\Http\Controllers\MenuCategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StoreGalleryController;
use App\Http\Controllers\StoreOperatingHourController;
use App\Http\Controllers\StoreProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Models\Merchant;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::bind('merchant', function ($slug) {
    return Merchant::where('slug', $slug)->firstOrFail();
});

Route::get('/', function () {
    return Inertia::render('customer/index');
})->name('home');

// ADMIN ROUTES
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
                Route::delete('/soft-delete/{customer}', 'softDelete')->name('admin.customers.softDelete');
                Route::delete('/force-delete/{customer}', 'forceDelete')->name('admin.customers.forceDelete');
                Route::patch('/restore/{customer}', 'restore')->name('admin.customers.restore');
            });

        // Merchant
        Route::prefix('/merchants')
            ->controller(MerchantController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.merchants.index');
                Route::get('/show/{id}', 'show')->name('admin.merchants.show');
                Route::put('/verify/{id}', 'verifyMerchant')->name('admin.merchants.verify');
                Route::delete('/soft-delete/{merchant}', 'softDelete')->name('admin.merchants.softDelete');
                Route::delete('/force-delete/{merchant}', 'forceDelete')->name('admin.merchants.forceDelete');
                Route::patch('/restore/{merchant}', 'restore')->name('admin.merchants.restore');
            });
    });
});

// MERCHANT ROUTES
Route::middleware(['auth', 'verified', 'role:merchant'])->group(function () {
    Route::get('/merchant/dashboard', [DashboardController::class, 'index_merchant'])->name('merchant.dashboard');

    // Menu Management
    Route::prefix('/merchant/menu-management')->group(function () {
        // Menu Category
        Route::prefix('/menu-categories')
            ->controller(MenuCategoryController::class)
            ->group(function () {
                Route::get('/', 'index_merchant')->name('merchant.menu-categories.index');
                Route::get('/create', 'create')->name('merchant.menu-categories.create');
                Route::post('/create', 'store')->name('merchant.menu-categories.store');
                Route::get('/edit/{menuCategory}', 'edit')->name('merchant.menu-categories.edit');
                Route::put('/edit/{menuCategory}', 'update')->name('merchant.menu-categories.update');
                Route::delete('/soft-delete/{menuCategory}', 'softDelete')->name('merchant.menu-categories.softDelete');
                Route::patch('/restore/{id}', 'restore')->name('merchant.menu-categories.restore');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('merchant.menu-categories.forceDelete');
            });

        // Menu Item
        Route::prefix('/menu-items')
            ->controller(MenuItemController::class)
            ->group(function () {
                Route::get('/', 'index_merchant')->name('merchant.menu-items.index');
                Route::get('/create', 'create')->name('merchant.menu-items.create');
                Route::post('/create', 'store')->name('merchant.menu-items.store');
                Route::get('/edit/{menuItem}', 'edit')->name('merchant.menu-items.edit');
                Route::put('/edit/{menuItem}', 'update')->name('merchant.menu-items.update');
                Route::delete('/soft-delete/{menuItem}', 'softDelete')->name('merchant.menu-items.softDelete');
                Route::patch('/restore/{id}', 'restore')->name('merchant.menu-items.restore');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('merchant.menu-items.forceDelete');
            });
    });

    // Store Management
    Route::prefix('/merchant/store-management')->group(function () {
        // Store Profile
        Route::prefix('/store-profile')
            ->controller(StoreProfileController::class)
            ->group(function () {
                Route::get('/', 'index_merchant')->name('merchant.store-profile.index_merchant');
                Route::get('/create', 'create')->name('merchant.store-profile.create');
                Route::post('/create', 'store')->name('merchant.store-profile.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.store-profile.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.store-profile.update');
            });

        // Store Gallery
        Route::prefix('/store-gallery')
            ->controller(StoreGalleryController::class)
            ->group(function () {
                Route::get('/', 'index_merchant')->name('merchant.store-gallery.index_merchant');
                Route::get('/create', 'create')->name('merchant.store-gallery.create');
                Route::post('/create', 'store')->name('merchant.store-gallery.store');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('merchant.store-gallery.softDelete');
                Route::patch('/restore/{id}', 'restore')->name('merchant.store-gallery.restore');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('merchant.store-gallery.forceDelete');
            });

        // Store Operating Hour
        Route::prefix('/store-operating-hour')
            ->controller(StoreOperatingHourController::class)
            ->group(function () {
                Route::get('/', 'index_merchant')->name('merchant.store-operating-hour.index_merchant');
                Route::get('/create', 'create')->name('merchant.store-operating-hour.create');
                Route::post('/store-or-update', 'storeOrUpdate')->name('merchant.store-operating-hour.storeOrUpdate');
            });
    });
});

// CUSTOMER ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    // Menu
    Route::get('/menu', [MenuItemController::class, 'index_customer'])->name('menu');

    // Menu Categories
    Route::get('/menu/categories', [MenuCategoryController::class, 'index_customer'])->name('menu-categories');

    // Merchant
    Route::get('/merchant', [MerchantController::class, 'index_customer'])->name('merchant');
    Route::get('/merchant/show/{merchant}', [MerchantController::class, 'showForCustomer'])->name('merchant.show');

    // Cart
    Route::get('/cart', [CartController::class, 'index_customer'])->name('cart');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::put('/cart/{id}', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index_customer'])->name('wishlist');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
