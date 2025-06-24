<?php

namespace App\Http\Controllers;

use App\Models\Courier;
use App\Models\Customer;
use App\Models\Merchant;
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
        return Inertia::render('admin/dashboard', [
            'totalUsers' => $totalUsers,
            'totalMerchants' => $totalMerchant,
            'totalCustomers' => $totalCustomer,
            'totalCouriers' => $totalCourier
        ]);
    }

    public function index_merchant(): Response
    {
        return Inertia::render('merchant/dashboard');
    }
}
