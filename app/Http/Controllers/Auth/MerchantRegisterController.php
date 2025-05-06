<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\MerchantRegisterRequest;
use App\Models\Bank;
use App\Models\Merchant;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MerchantRegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register/register-merchant');
    }

    public function store(MerchantRegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = User::create($validated);

        $user->assignRole('merchant');

        if ($request->hasFile('id_card_photo') && $request->file('id_card_photo')->isValid()) {
            $file = $request->file('id_card_photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('foto_ktp', $filename, 'public');

            $validated['id_card_photo'] = '/' . 'storage/' . $path;
        }

        $bankCode = $validated['bank_code'];

        // Cek jika bank code atau bank name kosong
        if (!$bankCode) {
            return back()->withErrors(['bank' => 'Bank tidak valid']);
        }

        Merchant::create([
            'user_id' => $user->id,
            'id_card_photo' => $validated['id_card_photo'] ?? null,
            'business_name' => $validated['business_name'],
            'business_phone' => $validated['business_phone'],
            'business_email' => $validated['business_email'],
            'postal_code' => $validated['postal_code'],
            'business_description' => $validated['business_description'],
            'business_address' => $validated['business_address'],
            'business_category_id' => $validated['business_category_id'],
            'bank_code' => $bankCode,
            'bank_account_number' => $validated['bank_account_number'],
            'bank_account_name' => $validated['bank_account_name'],
            'tax_identification_number' => $validated['tax_identification_number'],
        ]);

        return redirect()->route('login')->with(['success' => 'Register merchant successfully']);
    }
}
