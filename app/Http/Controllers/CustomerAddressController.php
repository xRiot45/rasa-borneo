<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerAddress;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CustomerAddressController extends Controller
{
    public function index(): InertiaResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        $customerId = $customer->id;
        $customerAddress = CustomerAddress::where('customer_id', $customerId)->get();

        return Inertia::render('customer/pages/address-list/index', [
            'data' => $customerAddress,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('customer/pages/address-list/pages/form');
    }

    public function edit(int $customerAddressId): InertiaResponse
    {
        // $user = Auth::user();
        // $customer = Customer::where('user_id', $user->id)->first();

        // $customerId = $customer->id;
        // $customerAddress = CustomerAddress::where('customer_id', $customerId)->get();

        $customerAddress = CustomerAddress::where('id', $customerAddressId)->first();
        return Inertia::render('customer/pages/address-list/pages/form', [
            'data' => $customerAddress,
        ]);
    }
}
