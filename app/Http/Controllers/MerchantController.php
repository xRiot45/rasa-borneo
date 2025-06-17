<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\MerchantRegisterRequest;
use App\Http\Requests\UpdateMerchantRequest;
use App\Mail\MerchantRegisteredMail;
use App\Models\BusinessCategory;
use App\Models\Merchant;
use App\Models\User;
use App\Notifications\MerchantVerifiedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class MerchantController extends Controller
{
    public function index(): InertiaResponse
    {
        $merchants = Merchant::withTrashed()->with('businessCategory')->orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/users-management/merchants/index', [
            'data' => $merchants,
        ]);
    }

    public function index_customer(Request $request): InertiaResponse
    {
        $category = $request->query('category');

        $merchants = Merchant::with('businessCategory', 'user', 'storeProfile')
            ->where('is_verified', 1)
            ->when($category, function ($query, $category) {
                $query->whereHas('businessCategory', function ($q) use ($category) {
                    $q->where('name', $category);
                });
            })
            ->get();

        return Inertia::render('customer/pages/merchant/index', [
            'data' => $merchants,
            'selectedCategory' => $category,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/users-management/merchants/pages/form');
    }

    public function store(MerchantRegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $defaultPassword = '12345678';

        $user = User::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'password' => bcrypt($defaultPassword),
            'phone_number' => $validated['phone_number'],
        ]);

        $user
            ->forceFill([
                'email_verified_at' => now(),
            ])
            ->save();

        $user->assignRole('merchant');

        $fileField = 'id_card_photo';
        if ($request->hasFile($fileField) && $request->file($fileField)->isValid()) {
            $file = $request->file($fileField);
            $filename = time() . '_' . $file->getClientOriginalName();
            $folderPath = 'merchant_assets/' . $fileField;
            $path = $file->storeAs($folderPath, $filename, 'public');

            $validated[$fileField] = '/storage/' . $path;
        }

        $bankCode = $validated['bank_code'];
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
            'is_verified' => true,
        ]);

        Mail::to($user->email)->send(new MerchantRegisteredMail($user, $defaultPassword));

        return redirect()
            ->route('admin.merchants.index')
            ->with(['success' => 'Register merchant successfully']);
    }

    public function edit(int $id): InertiaResponse
    {
        $merchant = Merchant::withTrashed()->findOrFail($id);
        $merchant->load('user');
        return Inertia::render('admin/users-management/merchants/pages/form', [
            'merchant' => $merchant,
        ]);
    }

    public function update(UpdateMerchantRequest $request, int $id): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::findOrFail($id);
        $merchant = $user->merchant;

        if (!$merchant) {
            return back()->withErrors(['merchant' => 'Data merchant tidak ditemukan.']);
        }

        $userData = collect($validated)
            ->only(['full_name', 'email', 'phone_number'])
            ->toArray();

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $user->update($userData);

        $fileField = 'id_card_photo';

        if ($request->hasFile($fileField) && $request->file($fileField)->isValid()) {
            if ($merchant->$fileField && Storage::disk('public')->exists(str_replace('/storage/', '', $merchant->$fileField))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $merchant->$fileField));
            }

            $file = $request->file($fileField);
            $filename = time() . '_' . $file->getClientOriginalName();

            $folderPath = 'merchant_assets/' . $fileField;
            $path = $file->storeAs($folderPath, $filename, 'public');

            $validated[$fileField] = '/storage/' . $path;
        }

        $merchantData = collect($validated)
            ->except(['full_name', 'email', 'phone_number', 'password'])
            ->toArray();

        $merchant->update($merchantData);

        return redirect()
            ->route('admin.merchants.index')
            ->with(['success' => 'Data merchant berhasil diperbarui.']);
    }

    public function merchant_categories(): InertiaResponse
    {
        $merchantCategories = BusinessCategory::all();
        return Inertia::render('customer/pages/merchant-categories/index', [
            'data' => $merchantCategories,
        ]);
    }

    public function show(int $id): InertiaResponse
    {
        $merchant = Merchant::withTrashed()->findOrFail($id);

        $merchant->load('businessCategory', 'user');
        return Inertia::render('admin/users-management/merchants/pages/show', [
            'data' => $merchant,
        ]);
    }

    public function showForCustomer(Merchant $merchant): InertiaResponse
    {
        $merchant->load('businessCategory', 'user', 'storeProfile', 'storeGalleries', 'storeOperatingHours', 'menuCategories', 'menuItems.menuCategory', 'reviews.customer.user', 'reviews');
        return Inertia::render('customer/pages/merchant/detail/index', [
            'data' => $merchant,
        ]);
    }

    public function verifyMerchant(int $int): RedirectResponse
    {
        $merchant = Merchant::withTrashed()->findOrFail($int);

        $merchant->update(['is_verified' => true]);

        $user = $merchant->user()->first();

        $merchant->user->notify(new MerchantVerifiedNotification($merchant));

        $user
            ->forceFill([
                'email_verified_at' => now(),
            ])
            ->save();

        return redirect()->back(303)->with('success', 'Usaha berhasil diverifikasi');
    }

    public function softDelete($id): RedirectResponse
    {
        $merchant = Merchant::withTrashed()->findOrFail($id);

        $user = $merchant->user()->first();
        $user->delete();
        $merchant->delete();

        return redirect()
            ->back()
            ->with(['success' => 'Merchant berhasil dihapus sementara']);
    }


    public function forceDelete(int $id): RedirectResponse
    {
        $merchant = Merchant::onlyTrashed()->with('user')->findOrFail($id);
        if ($merchant->user()->withTrashed()->exists()) {
            $merchant->user()->withTrashed()->first()->forceDelete();
        }

        if ($merchant->id_card_photo) {
            $path = str_replace('/storage/', '', $merchant->id_card_photo);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        $merchant->forceDelete();
        return redirect()
            ->back()
            ->with(['success' => 'Merchant berhasil dihapus permanen']);
    }

    public function restore(int $id): RedirectResponse
    {
        $merchant = Merchant::onlyTrashed()->with('user')->findOrFail($id);
        if ($merchant->user()->withTrashed()->exists()) {
            $merchant->user()->withTrashed()->first()->restore();
        }

        $merchant->restore();

        return redirect()
            ->back()
            ->with(['success' => 'Merchant berhasil direstore']);
    }
}
