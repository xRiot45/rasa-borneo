<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Models\Customer;
use App\Models\Merchant;
use App\Models\MerchantReview;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index_admin(): Response
    {
        $totalUsers = User::count();
        $totalMerchant = Merchant::count();
        $totalCustomer =  Customer::count();
        $totalCourier = Courier::count();
        $topRatedMerchants = MerchantReview::select('merchant_id')
            ->selectRaw('AVG(rating) as avg_rating')
            ->selectRaw('COUNT(*) as review_count')
            ->groupBy('merchant_id')
            ->orderByDesc('avg_rating')
            ->with('merchant.businessCategory', 'merchant.storeProfile')
            ->get();


        return Inertia::render('admin/dashboard', [
            'totalUsers' => $totalUsers,
            'totalMerchants' => $totalMerchant,
            'totalCustomers' => $totalCustomer,
            'totalCouriers' => $totalCourier,
            'topRatedMerchants' => $topRatedMerchants
        ]);
    }

    public function index_merchant(): Response
    {
        return Inertia::render('merchant/dashboard');
    }
}
