<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerAddressRequest;
use App\Models\Customer;
use App\Models\CustomerAddress;
use Illuminate\Http\RedirectResponse;
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

    public function store(CustomerAddressRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $validated = $request->validated();

        // Jika is_primary dikirim dan bernilai true, ubah semua alamat lain menjadi false
        if (!empty($validated['is_primary']) && $validated['is_primary']) {
            CustomerAddress::where('customer_id', $customerId)
                ->where('is_primary', 1)
                ->update(['is_primary' => 0]);
        }

        CustomerAddress::create(
            array_merge($validated, [
                'customer_id' => $customerId,
            ]),
        );

        return redirect()->route('address-list.index')->with('success', 'Alamat berhasil ditambahkan.');
    }

    public function edit(int $customerAddressId): InertiaResponse
    {
        // $user = Auth::user();
        // $customer = Customer::where('user_id', $user->id)->first();

        // $customerId = $customer->id;
        // $customerAddress = CustomerAddress::where('customer_id', $customerId)->get();

        $customerAddress = CustomerAddress::where('id', $customerAddressId)->first();
        return Inertia::render('customer/pages/address-list/pages/form', [
            'customerAddress' => $customerAddress,
        ]);
    }
}
