<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourierRequest;
use App\Mail\CourierRegisteredMail;
use App\Models\Courier;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CourierController extends Controller
{
    public function indexAdmin(): InertiaResponse
    {
        $couriers = Courier::withTrashed()->with('user')->get();
        return Inertia::render('admin/users-management/couriers/index', [
            'couriers' => $couriers
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/users-management/couriers/pages/form');
    }

    public function store(CourierRequest $request): RedirectResponse
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
}
