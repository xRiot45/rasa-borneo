<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourierRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Throwable;

class CourierController extends Controller
{
    public function indexAdmin(): InertiaResponse
    {
        return Inertia::render('admin/users-management/couriers/index');
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/users-management/couriers/pages/form');
    }

    public function store(CourierRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'phone_number' => $validated['phone_number'],
            'email_verified_at' => now(),
        ]);

        // Handle upload gambar
        $fileFields = ['id_card_photo', 'profile_image', 'driving_license_photo'];
        foreach ($fileFields as $field) {
            if ($request->hasFile($field) && $request->file($field)->isValid()) {
                $file = $request->file($field);
                $filename = time() . '_' . $file->getClientOriginalName();

                $path = $file->storeAs("courier_assets/{$field}", $filename, 'public');
                $validated[$field] = '/storage/' . $path;
            }
        }

        // Simpan courier
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

        return redirect()
            ->route('admin.couriers.index')
            ->with(['success' => 'Courier berhasil ditambahkan']);
    }
}
