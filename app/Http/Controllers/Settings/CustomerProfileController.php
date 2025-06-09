<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\CustomerProfileUpdateRequest;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CustomerProfileController extends Controller
{
    public function edit(Request $request): InertiaResponse
    {
        $customer = Customer::with('user')->where('user_id', Auth::id())->first();
        return Inertia::render('customer/pages/settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'customer' => $customer
        ]);
    }

    public function update(CustomerProfileUpdateRequest $request): RedirectResponse
    {
        $user = User::find(Auth::id());
        $user->update([
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
        ]);

        $validated = [];
        if ($request->hasFile('profile_image') && $request->file('profile_image')->isValid()) {
            $file = $request->file('profile_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('customer_assets/profile_image', $filename, 'public');
            $validated['profile_image'] = '/storage/' . $path;
        }

        $customer = $user->customer;
        if (!$customer) {
            abort(404, 'Data customer tidak ditemukan.');
        }

        $customer->update([
            'birthplace' => $request->birthplace,
            'birthdate' => $request->birthdate,
            'profile_image' => $validated['profile_image'] ?? $customer->profile_image,
            'gender' => $request->gender,
        ]);

        return redirect()
            ->route('customer.setting.edit')
            ->with(['success' => 'Profil berhasil diperbarui']);
    }
}
