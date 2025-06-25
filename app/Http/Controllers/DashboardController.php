<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Models\Customer;
use App\Models\MenuItem;
use App\Models\MenuItemReview;
use App\Models\Merchant;
use App\Models\MerchantReview;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index_admin(): Response
    {
        $totalUsers = User::count();
        $totalMerchant = Merchant::count();
        $totalCustomer = Customer::count();
        $totalCourier = Courier::count();
        $topRatedMerchants = MerchantReview::select('merchant_id')
            ->selectRaw('AVG(rating) as avg_rating')
            ->selectRaw('COUNT(*) as review_count')
            ->groupBy('merchant_id')
            ->orderByDesc('avg_rating')
            ->with('merchant.businessCategory', 'merchant.storeProfile')
            ->get()
            ->map(function ($item) {
                $item->avg_rating = (float) $item->avg_rating;
                return $item;
            });

        $topRatedMenus = MenuItemReview::select('menu_item_id')
            ->selectRaw('AVG(rating) as avg_rating')
            ->selectRaw('COUNT(*) as review_count')
            ->groupBy('menu_item_id')
            ->orderByDesc('avg_rating')
            ->with('menuItem.menuCategory')
            ->get()
            ->map(function ($item) {
                $item->avg_rating = (float) $item->avg_rating;
                return $item;
            });

        $transactionsByOrderType = Transaction::selectRaw('order_type, COUNT(*) as total')->groupBy('order_type')->pluck('total', 'order_type');

        $transactionByPaymentMethod = Transaction::selectRaw('payment_method, COUNT(*) as total')->groupBy('payment_method')->pluck('total', 'payment_method');

        $transactionByPaymentStatus = Transaction::selectRaw('payment_status, COUNT(*) as total')->groupBy('payment_status')->pluck('total', 'payment_status');

        return Inertia::render('admin/dashboard', [
            'totalUsers' => $totalUsers,
            'totalMerchants' => $totalMerchant,
            'totalCustomers' => $totalCustomer,
            'totalCouriers' => $totalCourier,
            'topRatedMerchants' => $topRatedMerchants,
            'topRatedMenus' => $topRatedMenus,
            'transactionsByOrderType' => $transactionsByOrderType,
            'transactionByPaymentMethod' => $transactionByPaymentMethod,
            'transactionByPaymentStatus' => $transactionByPaymentStatus
        ]);
    }

    public function index_merchant(): Response
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->firstOrFail();

        $totalMenu = MenuItem::where('merchant_id', $merchant->id)->count();
        $totalMenuRecommended = MenuItem::where('merchant_id', $merchant->id)->where('is_recommended', true)->count();
        return Inertia::render('merchant/dashboard', [
            'totalMenu' => $totalMenu,
            'totalMenuRecommended' => $totalMenuRecommended
        ]);
    }
}
