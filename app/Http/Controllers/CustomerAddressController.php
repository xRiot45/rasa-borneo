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
        $customerAddress = CustomerAddress::where('id', $customerAddressId)->first();
        return Inertia::render('customer/pages/address-list/pages/form', [
            'customerAddress' => $customerAddress,
        ]);
    }

    public function update(int $customerAddressId, CustomerAddressRequest $request): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $validated = $request->validated();
        $customerAddress = CustomerAddress::where('id', $customerAddressId)->first();

        if (!empty($validated['is_primary']) && $validated['is_primary']) {
            CustomerAddress::where('customer_id', $customerId)
                ->where('is_primary', 1)
                ->update(['is_primary' => 0]);
        }

        $customerAddress->update($validated);
        return redirect()->route('address-list.index')->with('success', 'Alamat berhasil diubah.');
    }

    public function setPrimary(int $customerAddressId): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $customerAddress = CustomerAddress::findOrFail($customerAddressId);
        if ($customerAddress->customer_id !== $customerId) {
            abort(403, 'Anda tidak memiliki izin untuk mengubah alamat ini.');
        }

        CustomerAddress::where('customer_id', $customerAddress->customer_id)
            ->update(['is_primary' => false]);

        $customerAddress->update(['is_primary' => true]);

        return redirect()->back()->with('success', 'Alamat utama berhasil diubah.');
    }

    public function destroy(int $customerAddressId): RedirectResponse
    {
        $customerAddress = CustomerAddress::where('id', $customerAddressId)->first();
        $customerAddress->delete();
        return redirect()->route('address-list.index')->with('success', 'Alamat berhasil dihapus.');
    }
}
