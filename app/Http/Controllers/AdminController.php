<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AdminController extends Controller
{
    public function index(): InertiaResponse
    {
        $admins = User::role('admin')->get();
        return Inertia::render('admin/users-management/admins/index', [
            'admins' => $admins,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/users-management/admins/pages/form');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->all();

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user = User::create($data);
        $user->forceFill([
            'email_verified_at' => now(),
        ])->save();

        $user->assignRole('admin');

        return redirect()->route('admin.admins.index');
    }

    public function edit(int $id): InertiaResponse
    {
        $admin = User::find($id);
        return Inertia::render('admin/users-management/admins/pages/form', [
            'admin' => $admin,
        ]);
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $admin = User::findOrFail($id);

        $data = $request->all();

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $admin->update($data);

        return redirect()->route('admin.admins.index');
    }

    public function destroy(int $id): RedirectResponse
    {
        $admin = User::find($id);
        $admin->delete();

        return redirect()->route('admin.admins.index');
    }
}
