<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BusinessCategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\CourierAssigmentController;
use App\Http\Controllers\CourierController;
use App\Http\Controllers\CustomerAddressController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseReportCategoryController;
use App\Http\Controllers\ExpenseReportController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\ManageRolePermissionController;
use App\Http\Controllers\MenuCategoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\MenuItemReviewController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\MerchantReviewController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfitReportController;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\RevenueReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Settings\AdminPasswordController;
use App\Http\Controllers\Settings\AdminProfileController;
use App\Http\Controllers\Settings\CourierPasswordController;
use App\Http\Controllers\Settings\CourierProfileController;
use App\Http\Controllers\Settings\CustomerPasswordController;
use App\Http\Controllers\Settings\CustomerProfileController;
use App\Http\Controllers\Settings\MerchantPasswordController;
use App\Http\Controllers\Settings\MerchantProfileController;
use App\Http\Controllers\StoreGalleryController;
use App\Http\Controllers\StoreOperatingHourController;
use App\Http\Controllers\StoreProfileController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\WithdrawController;
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

    // RBAC Management
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

    // Master Data
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

    // Users Management
    Route::prefix('/admin/users-management')->group(function () {
        // All Users
        Route::prefix('/all-users')
            ->controller(UserController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.index');
            });

        // Admin
        Route::prefix('/admins')
            ->controller(AdminController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.admins.index');
                Route::get('/create', 'create')->name('admin.admins.create');
                Route::post('/create', 'store')->name('admin.admins.store');
                Route::get('/edit/{id}', 'edit')->name('admin.admins.edit');
                Route::put('/edit/{id}', 'update')->name('admin.admins.update');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('admin.admins.softDelete');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('admin.admins.forceDelete');
                Route::patch('/restore/{id}', 'restore')->name('admin.admins.restore');
            });

        // Customer
        Route::prefix('/customers')
            ->controller(CustomerController::class)
            ->group(function () {
                Route::get('/', 'index')->name('admin.customers.index');
                Route::get('/create', 'create')->name('admin.customers.create');
                Route::post('/create', 'store')->name('admin.customers.store');
                Route::get('/edit/{id}', 'edit')->name('admin.customers.edit');
                Route::put('/edit/{id}', 'update')->name('admin.customers.update');
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
                Route::get('/create', 'create')->name('admin.merchants.create');
                Route::post('/create', 'store')->name('admin.merchants.store');
                Route::get('/edit/{id}', 'edit')->name('admin.merchants.edit');
                Route::put('/edit/{id}', 'update')->name('admin.merchants.update');
                Route::get('/show/{id}', 'show')->name('admin.merchants.show');
                Route::put('/verify/{id}', 'verifyMerchant')->name('admin.merchants.verify');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('admin.merchants.softDelete');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('admin.merchants.forceDelete');
                Route::patch('/restore/{id}', 'restore')->name('admin.merchants.restore');
            });

        // Couriers
        Route::prefix('/couriers')
            ->controller(CourierController::class)
            ->group(function () {
                Route::get('/', 'indexAdmin')->name('admin.couriers.index');
                Route::get('/create', 'create')->name('admin.couriers.create');
                Route::post('/create', 'store')->name('admin.couriers.store');
                Route::get('/edit/{id}', 'edit')->name('admin.couriers.edit');
                Route::put('/edit/{id}', 'update')->name('admin.couriers.update');
                Route::get('/show/{id}', 'show')->name('admin.couriers.show');
                Route::delete('/soft-delete/{courier}', 'softDelete')->name('admin.couriers.softDelete');
                Route::delete('/force-delete/{courier}', 'forceDelete')->name('admin.couriers.forceDelete');
                Route::patch('/restore/{courier}', 'restore')->name('admin.couriers.restore');
            });
    });

    // Financial Management
    Route::prefix('/admin/financial-management')->group(function () {
        // Withdraw
        Route::prefix('/withdraw')
            ->controller(WithdrawController::class)
            ->group(function () {
                Route::get('/', 'indexAdmin')->name('admin.withdraw.indexAdmin');
                Route::put('/update-status/{withdrawId}', 'updateStatus')->name('admin.withdraw.updateStatus');
                Route::post('/process-withdrawal-proof/{withdrawId}', 'processWithdrawalProof')->name('admin.withdraw.processWithdrawalProof');
            });
    });

    // Order Management
    Route::prefix('/admin/order-management')->group(function () {
        // Incoming Order
        Route::prefix('/incoming-order')
            ->controller(OrderController::class)
            ->group(function () {
                Route::get('/', 'incomingOrderAdmin')->name('admin.incoming-order.index');
                Route::put('/update-status/{transactionCode}', 'updateOrderStatus')->name('admin.incoming-order.updateOrderStatus');
            });

        // Order History
        Route::prefix('/order-history')
            ->controller(OrderController::class)
            ->group(function () {
                Route::get('/', 'orderHistoryAdmin')->name('admin.order-history.index');
            });

        Route::controller(OrderController::class)->group(function () {
            Route::get('/show-order/{transactionCode}', 'showOrderDetailAdmin')->name('admin.order.show');
        });
    });

    // Customer Interaction
    Route::prefix('/admin/customer-interaction')->group(function () {
        // Menu Review
        Route::prefix('/menu-review')
            ->controller(MenuItemReviewController::class)
            ->group(function () {
                Route::get('/', 'indexAdmin')->name('merchant.menu-review.indexAdmin');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.menu-review.destroy');
            });

        // Merchant Review
        Route::prefix('/merchant-review')
            ->controller(MerchantReviewController::class)
            ->group(function () {
                Route::get('/', 'indexAdmin')->name('merchant.merchant-review.indexAdmin');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.merchant-review.destroy');
            });
    });

    // --- Setting ---
    // Fee
    Route::prefix('/admin/settings/fee')
        ->controller(FeeController::class)
        ->group(function () {
            Route::get('/', 'indexAdmin')->name('admin.setting.fee.indexAdmin');
            Route::put('/{id}', 'update')->name('admin.setting.fee.update');
        });

    // Profile
    Route::prefix('/admin/settings/profile')
        ->controller(AdminProfileController::class)
        ->group(function () {
            Route::get('/', 'edit')->name('admin.setting.profile.edit');
            Route::put('/', 'update')->name('admin.setting.profile.update');
            Route::delete('/', 'destroy')->name('admin.setting.profile.destroy');
        });

    // Password
    Route::prefix('/admin/settings/password')
        ->controller(AdminPasswordController::class)
        ->group(function () {
            Route::get('/', 'edit')->name('admin.password.edit');
            Route::put('/', 'update')->name('admin.password.update');
        });

    // Appearance
    Route::get('/admin/settings/appearance', function () {
        return Inertia::render('admin/pages/settings/appearance');
    })->name('appearance');
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
                Route::get('/edit/{id}', 'edit')->name('merchant.menu-categories.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.menu-categories.update');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('merchant.menu-categories.softDelete');
                Route::patch('/restore/{id}', 'restore')->name('merchant.menu-categories.restore');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('merchant.menu-categories.forceDelete');
            });

        // Menu Item
        Route::prefix('/menu-items')
            ->controller(MenuItemController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.menu-items.index');
                Route::get('/create', 'create')->name('merchant.menu-items.create');
                Route::post('/create', 'store')->name('merchant.menu-items.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.menu-items.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.menu-items.update');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('merchant.menu-items.softDelete');
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
                Route::get('/', 'indexMerchant')->name('merchant.store-gallery.indexMerchant');
                Route::get('/create', 'create')->name('merchant.store-gallery.create');
                Route::post('/create', 'store')->name('merchant.store-gallery.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.store-gallery.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.store-gallery.update');
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

        // Qr Code
        Route::prefix('/qr-code')
            ->controller(QrCodeController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.qr-code.indexMerchant');
            });

        // Table
        Route::prefix('/table')
            ->controller(TableController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.table.indexMerchant');
                Route::get('/create', 'create')->name('merchant.table.create');
                Route::post('/create', 'store')->name('merchant.table.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.table.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.table.update');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('merchant.table.softDelete');
                Route::patch('/restore/{id}', 'restore')->name('merchant.table.restore');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('merchant.table.forceDelete');
            });
    });

    // Promotion Management
    Route::prefix('/merchant/promotion-management')->group(function () {
        // Kupon
        Route::prefix('/coupons')
            ->controller(CouponController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.coupon.indexMerchant');
                Route::get('/create', 'create')->name('merchant.coupon.create');
                Route::post('/create', 'store')->name('merchant.coupon.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.coupon.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.coupon.update');
                Route::delete('/soft-delete/{id}', 'softDelete')->name('merchant.coupon.softDelete');
                Route::patch('/restore/{id}', 'restore')->name('merchant.coupon.restore');
                Route::delete('/force-delete/{id}', 'forceDelete')->name('merchant.coupon.forceDelete');
            });
    });

    // Order Management
    Route::prefix('/merchant/order-management')->group(function () {
        // Incoming Order
        Route::prefix('/incoming-order')
            ->controller(OrderController::class)
            ->group(function () {
                Route::get('/', 'incomingOrderMerchant')->name('merchant.incoming-order.index');
                Route::put('/update-status/{transactionCode}', 'updateOrderStatus')->name('merchant.incoming-order.updateOrderStatus');
                Route::get('/check-status-cashless/{transactionCode}', 'checkPaymentStatusCashless')->name('merchant.order.checkPaymentStatusCashless');
                Route::put('/confirm-payment-cash/{transactionCode}', 'confirmPaymentCash')->name('merchant.order.confirmPaymentCash');
            });

        // Order History
        Route::prefix('/order-history')
            ->controller(OrderController::class)
            ->group(function () {
                Route::get('/', 'orderHistoryMerchant')->name('merchant.order-history.index');
            });

        Route::controller(OrderController::class)->group(function () {
            Route::get('/show-order/{transactionCode}', 'showOrderDetailMerchant')->name('merchant.order.show');
        });
    });

    // Financial Management
    Route::prefix('/merchant/financial-management')->group(function () {
        // Withdraw
        Route::prefix('/withdraw')
            ->controller(WithdrawController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.withdraw.indexMerchant');
                Route::get('/create', 'showMerchantWithdrawForm')->name('merchant.withdraw.create');
                Route::post('/create', 'requestWithdrawMerchant')->name('merchant.withdraw.requestWithdrawMerchant');
                Route::put('/cancel/{id}', 'cancelledWithdraw')->name('merchant.withdraw.cancelledWithdraw');
            });

        // Revenue Report
        Route::prefix('/revenue-report')
            ->controller(RevenueReportController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.revenue-report.indexMerchant');
                Route::get('/detail/{reportDate}', 'detailReport')->name('merchant.revenue-report.detailReport');
                Route::get('/export/all', 'exportRevenueReport')->name('merchant.revenue-report.export');
                Route::get('/export/{reportDate}', 'exportByDate')->name('merchant.revenue-report.exportByDate');
            });

        // Expense Report
        Route::prefix('/expense-report')
            ->controller(ExpenseReportController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.expense-report.indexMerchant');
                Route::get('/detail/{reportDate}', 'detailReport')->name('merchant.expense-report.detailReport');
                Route::get('/create', 'create')->name('merchant.expense-report.create');
                Route::post('/create', 'store')->name('merchant.expense-report.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.expense-report.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.expense-report.update');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.expense-report.destroy');
                Route::get('/export/all', 'exportExpenseReport')->name('merchant.expense-report.export');
                Route::get('/export/{reportDate}', 'exportByDate')->name(name: 'merchant.expense-report.exportByDate');
            });

        // Expense Report Category
        Route::prefix('/expense-report-category')
            ->controller(ExpenseReportCategoryController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.expense-report-category.indexMerchant');
                Route::get('/create', 'create')->name('merchant.expense-report-category.create');
                Route::post('/create', 'store')->name('merchant.expense-report-category.store');
                Route::get('/edit/{id}', 'edit')->name('merchant.expense-report-category.edit');
                Route::put('/edit/{id}', 'update')->name('merchant.expense-report-category.update');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.expense-report-category.destroy');
            });

        // Profit Report
        Route::prefix('/profit-report')
            ->controller(ProfitReportController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.profit-report.indexMerchant');
                Route::post('/create', 'store')->name('merchant.profit-report.store');
                Route::get('/show/{id}', 'show')->name('merchant.profit-report.show');
                Route::get('/export', 'exportProfitReport')->name('merchant.profit-report.export');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.profit-report.destroy');
            });
    });

    // Customer Interaction
    Route::prefix('/merchant/customer-interaction')->group(function () {
        // Menu Review
        Route::prefix('/menu-review')
            ->controller(MenuItemReviewController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.menu-review.indexMerchant');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.menu-review.destroy');
            });

        // Merchant Review
        Route::prefix('/merchant-review')
            ->controller(MerchantReviewController::class)
            ->group(function () {
                Route::get('/', 'indexMerchant')->name('merchant.merchant-review.indexMerchant');
                Route::delete('/destroy/{id}', 'destroy')->name('merchant.merchant-review.destroy');
            });
    });

    // Settings
    Route::prefix('/merchant/settings')->group(function () {
        // Profile
        Route::get('/profile', [MerchantProfileController::class, 'edit'])->name('merchant.setting.edit');
        Route::put('/profile', [MerchantProfileController::class, 'update'])->name('merchant.setting.update');
        Route::delete('/profile', [MerchantProfileController::class, 'destroy'])->name('merchant.profile.destroy');

        // Appearance
        Route::get('/appearance', function () {
            return Inertia::render('merchant/pages/settings/appearance');
        })->name('appearance');

        // Password
        Route::get('/password', [MerchantPasswordController::class, 'edit'])->name('merchant.password.edit');
        Route::put('/password', [MerchantPasswordController::class, 'update'])->name('merchant.password.update');
    });
});

// CUSTOMER ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    // Menu
    Route::get('/menu', [MenuItemController::class, 'index_customer'])->name('menu');

    // Merchant Categories
    Route::get('/merchant/categories', [MerchantController::class, 'merchant_categories'])->name('merchant-categories');

    // Merchant
    Route::get('/merchant', [MerchantController::class, 'index_customer'])->name('merchant');
    Route::get('/merchant/show/{merchant}', [MerchantController::class, 'showForCustomer'])->name('merchant.show');

    // Cart
    Route::get('/cart', [CartController::class, 'index_customer'])->name('cart');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::post('/cart/clear', [CartController::class, 'clearCart'])->name('cart.clearCart');
    Route::patch('/cart/note/{id}', [CartController::class, 'addedNote'])->name('cart.addedNote');
    Route::put('/cart/{id}', [CartController::class, 'updateQuantity'])->name('cart.updateQuantity');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::delete('/cart/merchant/{merchantId}', [CartController::class, 'destroyAll'])->name('cart.destroyAll');

    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index_customer'])->name('wishlist');
    Route::post('/wishlist', [WishlistController::class, 'toggle'])->name('wishlist.toggle');

    // Checkout
    Route::get('/checkout/{transactionCode}', [CheckoutController::class, 'index'])
        ->middleware(['auth', 'check.transaction.status'])
        ->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    // Transaction
    Route::put('/transaction/pay-with-cash/{transactionCode}', [TransactionController::class, 'payWithCash'])->name('transaction.payWithCash');
    Route::put('/transaction/pay-with-midtrans/{transactionCode}', [TransactionController::class, 'payWithMidtrans'])->name('transaction.payWithMidtrans');
    Route::get('/transaction/{transactionCode}/success', [TransactionController::class, 'transactionSuccess'])
        ->middleware(['auth', 'check.transaction.owner'])
        ->name('transaction.success');
    Route::get('/transaction/{transactionCode}/pending', [TransactionController::class, 'transactionPending'])
        ->middleware(['auth', 'check.transaction.owner'])
        ->name('transaction.pending');
    Route::get('/transaction/{transactionCode}/failed', [TransactionController::class, 'transactionFailed'])
        ->middleware(['auth', 'check.transaction.owner'])
        ->name('transaction.failed');

    // Address List
    Route::get('/address-list', [CustomerAddressController::class, 'index'])->name('address-list.index');
    Route::get('/address-list/create', [CustomerAddressController::class, 'create'])->name('address-list.create');
    Route::post('/address-list', [CustomerAddressController::class, 'store'])->name('address-list.store');
    Route::get('/address-list/edit/{id}', [CustomerAddressController::class, 'edit'])->name('address-list.edit');
    Route::put('/address-list/edit/{id}', [CustomerAddressController::class, 'update'])->name('address-list.update');
    Route::put('/address-list/set-primary/{id}', [CustomerAddressController::class, 'setPrimary'])->name('address-list.setPrimary');
    Route::delete('/address-list/{id}', [CustomerAddressController::class, 'destroy'])->name('address-list.destroy');

    // Order List
    Route::get('/orders', [OrderController::class, 'customerOrders'])->name('order-list.customerOrders');
    Route::get('/order/show/{transactionCode}', [OrderController::class, 'showOrderDetailCustomer'])->name('order-list.showOrderDetailCustomer');

    // Review Merchant
    Route::post('/review/merchant/{merchantId}', [MerchantReviewController::class, 'storeReview'])->name('merchant.review.storeReview');

    // Review Menu Item
    Route::get('/review/{menuItemId}', [MenuItemReviewController::class, 'showReviewForCustomer'])->name('menu_item.review.showReviewForCustomer');
    Route::post('/review/{transactionId}/{menuItemId}', [MenuItemReviewController::class, 'storeReview'])->name('menu_item.review.storeReview');

    // Setting
    Route::get('/settings/profile', [CustomerProfileController::class, 'edit'])->name('customer.setting.edit');
    Route::put('/settings/profile', [CustomerProfileController::class, 'update'])->name('customer.setting.update');
    Route::delete('/settings/profile', [CourierProfileController::class, 'destroy'])->name('customer.profile.destroy');

    Route::get('/settings/password', [CustomerPasswordController::class, 'edit'])->name('customer.password.edit');
    Route::put('/settings/password', [CustomerPasswordController::class, 'update'])->name('customer.password.update');

    Route::get('/settings/appearance', function () {
        return Inertia::render('customer/pages/settings/appearance');
    })->name('appearance');
});

// COURIER ROUTES
Route::middleware(['auth', 'verified', 'role:courier'])->group(function () {
    // Home
    Route::get('/courier/home', [CourierController::class, 'indexCourier'])->name('courier.indexCourier');
    Route::post('/courier/toggle-online-status', [CourierAssigmentController::class, 'toggleOnlineStatus'])->name('courier.toggleOnlineStatus');

    // Delivery Request
    Route::get('/courier/delivery-requests', [CourierAssigmentController::class, 'deliveryRequest'])->name('courier.deliveryRequest');
    Route::post('/courier/delivery-requests/accept', [CourierAssigmentController::class, 'acceptedRequest'])->name('courier.acceptedRequest');
    Route::post('/courier/delivery-requests/reject', [CourierAssigmentController::class, 'rejectedRequest'])->name('courier.rejectedRequest');

    // My Deliveries
    Route::get('/courier/my-deliveries', [CourierAssigmentController::class, 'myDeliveries'])->name('courier.myDeliveries');
    Route::get('/courier/my-deliveries/{transactionCode}', [CourierAssigmentController::class, 'myDeliveriesDetail'])->name('courier.myDeliveriesDetail');
    Route::post('/courier/my-deliveries/{transactionCode}/ready-to-delivery', [CourierAssigmentController::class, 'orderReadyToDelivery'])->name('courier.orderReadyToDelivery');
    Route::post('/courier/my-deliveries/{transactionCode}/order-delivery-completed', [CourierAssigmentController::class, 'orderCompleteDelivery'])->name('courier.orderCompleteDelivery');
    Route::put('/confirm-payment-cash/{transactionCode}', [OrderController::class, 'confirmPaymentCash'])->name('courier.order.confirmPaymentCash');

    // Delivery History
    Route::get('/courier/delivery-history', [CourierAssigmentController::class, 'deliveryHistory'])->name('courier.deliveryHistory');
    Route::get('/courier/delivery-history/{transactionCode}', [CourierAssigmentController::class, 'detailDeliveryHistory'])->name('courier.detailDeliveryHistory');

    // Withdraw
    Route::get('/courier/withdraw', [WithdrawController::class, 'showCourierWithdrawForm'])->name('courier.withdraw.showCourierWithdrawForm');
    Route::post('/courier/withdraw', [WithdrawController::class, 'requestWithdrawCourier'])->name('courier.withdraw.requestWithdrawCourier');
    Route::get('/courier/withdraw/history', [WithdrawController::class, 'withdrawHistoryCourier'])->name('courier.withdraw.withdrawHistoryCourier');

    // Setting
    Route::get('/courier/settings/profile', [CourierProfileController::class, 'edit'])->name('courier.setting.edit');
    Route::put('/courier/settings/profile', [CourierProfileController::class, 'update'])->name('courier.setting.update');
    Route::delete('/courier/settings/profile', [CourierProfileController::class, 'destroy'])->name('courier.profile.destroy');

    Route::get('/courier/settings/password', [CourierPasswordController::class, 'edit'])->name('courier.password.edit');
    Route::put('/courier/settings/password', [CourierPasswordController::class, 'update'])->name('courier.password.update');

    Route::get('/courier/settings/appearance', function () {
        return Inertia::render('courier/pages/settings/appearance');
    })->name('appearance');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
