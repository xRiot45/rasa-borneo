<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\CourierRegisterRequest;
use App\Http\Requests\CourierRequest;
use App\Http\Requests\UpdateCourierRequest;
use App\Mail\CourierRegisteredMail;
use App\Models\Courier;
use App\Models\CourierWallet;
use App\Models\CourierWalletHistory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CourierController extends Controller
{
    public function indexAdmin(): InertiaResponse
    {
        $couriers = Courier::withTrashed()->with('user')->get();
        return Inertia::render('admin/users-management/couriers/index', [
            'couriers' => $couriers,
        ]);
    }

    public function indexCourier(): InertiaResponse
    {
        $user = Auth::user();
        $courier = Courier::where('user_id', $user->id)->firstOrFail();
        $courierId = $courier->id;

        // Ambil saldo dari tabel courier_wallets berdasarkan courier_id
        $wallet = CourierWallet::where('courier_id', $courierId)->first();

        // Waktu untuk filter
        $today = Carbon::today();
        $startOfWeek = Carbon::now()->startOfWeek(); // Mulai minggu (Senin)
        $startOfMonth = Carbon::now()->startOfMonth();

        // Pendapatan Harian
        $dailyEarnings = CourierWalletHistory::where('courier_id', $courierId)->whereDate('earned_at', $today)->sum('amount');

        // Pendapatan Mingguan
        $weeklyEarnings = CourierWalletHistory::where('courier_id', $courierId)
            ->whereBetween('earned_at', [$startOfWeek, Carbon::now()])
            ->sum('amount');

        // Pendapatan Bulanan
        $monthlyEarnings = CourierWalletHistory::where('courier_id', $courierId)
            ->whereBetween('earned_at', [$startOfMonth, Carbon::now()])
            ->sum('amount');

        return Inertia::render('courier/index', [
            'balance' => $wallet->balance ?? 0,
            'earnings' => [
                'daily' => $dailyEarnings,
                'weekly' => $weeklyEarnings,
                'monthly' => $monthlyEarnings,
            ],
            'courier' => [
                'is_online' => $courier->is_online,
            ],
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/users-management/couriers/pages/form');
    }

    public function store(CourierRegisterRequest $request): RedirectResponse
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
        $user->assignRole('courier');

        $fileFields = ['id_card_photo', 'profile_image', 'driving_license_photo'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field) && $request->file($field)->isValid()) {
                $file = $request->file($field);
                $filename = time() . '_' . $file->getClientOriginalName();

                $path = $file->storeAs("courier_assets/{$field}", $filename, 'public');
                $validated[$field] = '/storage/' . $path;
            }
        }

        $user->courier()->create([
            'user_id' => $user->id,
            'national_id' => $validated['national_id'],
            'id_card_photo' => $validated['id_card_photo'] ?? null,
            'age' => $validated['age'],
            'birthplace' => $validated['birthplace'],
            'birthdate' => ($validated['birthdate'] = Carbon::parse($validated['birthdate'])->format('Y-m-d')),
            'profile_image' => $validated['profile_image'] ?? null,
            'gender' => $validated['gender'],
            'driving_license_photo' => $validated['driving_license_photo'] ?? null,
            'license_plate' => $validated['license_plate'],
            'is_online' => false,
            'is_verified' => true,
        ]);

        Mail::to($user->email)->send(new CourierRegisteredMail($user, $defaultPassword));

        return redirect()
            ->route('admin.couriers.index')
            ->with(['success' => 'Courier berhasil ditambahkan']);
    }

    public function edit(int $id): InertiaResponse
    {
        $courier = Courier::withTrashed()->findOrFail($id);
        $courier->load('user');
        return Inertia::render('admin/users-management/couriers/pages/form', [
            'courier' => $courier,
        ]);
    }

    public function update(UpdateCourierRequest $request, int $id): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::findOrFail($id);
        $courier = $user->courier;

        if (!$courier) {
            return back()->withErrors(['courier' => 'Data courier tidak ditemukan.']);
        }

        $userData = collect($validated)
            ->only(['full_name', 'email', 'phone_number'])
            ->toArray();

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $user->update($userData);

        $fileFields = ['id_card_photo', 'profile_image', 'driving_license_photo'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field) && $request->file($field)->isValid()) {
                if ($courier->$field && Storage::disk('public')->exists(str_replace('/storage/', '', $courier->$field))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $courier->$field));
                }

                $file = $request->file($field);
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs("courier_assets/{$field}", $filename, 'public');
                $validated[$field] = '/storage/' . $path;
            }
        }

        $courierData = collect($validated)
            ->except(['full_name', 'email', 'phone_number', 'password'])
            ->toArray();

        if (isset($courierData['birthdate'])) {
            $courierData['birthdate'] = Carbon::parse($courierData['birthdate'])->format('Y-m-d');
        }

        $courier->update($courierData);

        return redirect()
            ->route('admin.couriers.index')
            ->with(['success' => 'Data courier berhasil diperbarui.']);
    }

    public function show(int $id): InertiaResponse
    {
        $courier = Courier::withTrashed()->findOrFail($id);
        $courier->load('user');

        return Inertia::render('admin/users-management/couriers/pages/show', [
            'data' => $courier,
        ]);
    }

    public function softDelete(Courier $courier): RedirectResponse
    {
        $user = $courier->user()->first();
        $user->delete();
        $courier->delete();
        return redirect()
            ->back()
            ->with(['success' => 'Courier berhasil dihapus sementara']);
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $courier = Courier::onlyTrashed()->with('user')->findOrFail($id);

        if ($courier->user()->withTrashed()->exists()) {
            $courier->user()->withTrashed()->first()->forceDelete();
        }

        $fileFields = ['id_card_photo', 'profile_image', 'driving_license_photo'];
        foreach ($fileFields as $field) {
            if ($courier->$field) {
                $path = str_replace('/storage/', '', $courier->$field);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        $courier->forceDelete();
        return redirect()->route('admin.couriers.index')->with('success', 'Kurir dan aset terkait berhasil dihapus permanen.');
    }

    public function restore(int $id): RedirectResponse
    {
        $courier = Courier::onlyTrashed()->with('user')->findOrFail($id);

        if ($courier->user()->withTrashed()->exists()) {
            $courier->user()->withTrashed()->first()->restore();
        }

        $courier->restore();
        return redirect()->route('admin.couriers.index')->with('success', 'Kurir berhasil direstore');
    }
}
