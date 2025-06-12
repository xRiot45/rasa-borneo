<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\CustomerRegisterRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CustomerController extends Controller
{
    public function index(): InertiaResponse

    {
        $customers = Customer::withTrashed()->with('user')->get();
        return Inertia::render('admin/users-management/customers/index', [
            'data' => $customers,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/users-management/customers/pages/form');
    }

    public function store(CustomerRegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = User::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'],
        ]);

        $user
            ->forceFill([
                'email_verified_at' => now(),
            ])
            ->save();
        $user->assignRole('customer');

        $fileField = 'profile_image';
        if ($request->hasFile($fileField) && $request->file($fileField)->isValid()) {
            $file = $request->file($fileField);
            $filename = time() . '_' . $file->getClientOriginalName();
            $folderPath = 'customer_assets/' . $fileField;
            $path = $file->storeAs($folderPath, $filename, 'public');

            $validated[$fileField] = '/storage/' . $path;
        }

        Customer::create([
            'user_id' => $user->id,
            'birthplace' => $validated['birthplace'],
            'birthdate' => $validated['birthdate'],
            'profile_image' => $validated['profile_image'] ?? null,
            'gender' => $validated['gender'],
        ]);

        return redirect()
            ->route('admin.customers.index')
            ->with(['success' => 'Customer berhasil ditambahkan']);
    }

    public function edit(int $id): InertiaResponse
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $customer->load('user');
        return Inertia::render('admin/users-management/customers/pages/form', [
            'customer' => $customer,
        ]);
    }

    public function update(CustomerUpdateRequest $request, int $id): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::findOrFail($id);
        $customer = $user->customer;

        $user = $customer->user;
        $user->update([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
        ]);

        $fileField = 'profile_image';
        if ($request->hasFile($fileField) && $request->file($fileField)->isValid()) {
            if ($customer->profile_image) {
                $oldPath = str_replace('/storage/', '', $customer->profile_image);
                Storage::disk('public')->delete($oldPath);
            }

            $file = $request->file($fileField);
            $filename = time() . '_' . $file->getClientOriginalName();
            $folderPath = 'customer_assets/' . $fileField;
            $path = $file->storeAs($folderPath, $filename, 'public');
            $validated[$fileField] = '/storage/' . $path;
        }

        $customer->update([
            'birthplace' => $validated['birthplace'],
            'birthdate' => $validated['birthdate'],
            'gender' => $validated['gender'],
            'profile_image' => $validated['profile_image'] ?? $customer->profile_image,
        ]);

        return redirect()
            ->route('admin.customers.index')
            ->with(['success' => 'Customer berhasil diperbarui']);
    }

    public function show(Customer $customer): InertiaResponse

    {
        $customer->load('user');
        return Inertia::render('admin/users-management/customers/pages/show', [
            'data' => $customer,
        ]);
    }

    public function softDelete(Customer $customer): RedirectResponse
    {
        $user = $customer->user()->first();

        $user->delete();
        $customer->delete();
        return redirect()
            ->back()
            ->with(['success' => 'Customer berhasil dihapus sementara']);
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $customer = Customer::withTrashed()->with('user')->findOrFail($id);
        if ($customer->user()->withTrashed()->exists()) {
            $customer->user()->withTrashed()->first()->forceDelete();
        }

        if ($customer->profile_image) {
            $path = str_replace('/storage/', '', $customer->profile_image);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
        }

        $customer->forceDelete();

        return redirect()
            ->back()
            ->with(['success' => 'Customer berhasil dihapus permanen']);
    }

    public function restore(int $id): RedirectResponse
    {
        $customer = Customer::onlyTrashed()->with('user')->findOrFail($id);
        if ($customer->user()->withTrashed()->exists()) {
            $customer->user()->withTrashed()->first()->restore();
        }

        $customer->restore();

        return redirect()
            ->back()
            ->with(['success' => 'Customer berhasil direstore']);
    }
}
