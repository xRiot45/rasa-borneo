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
        $admins = User::role('admin')->withTrashed()->get();
        return Inertia::render('admin/pages/users-management/admins/index', [
            'admins' => $admins,
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('admin/pages/users-management/admins/pages/form');
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
        return Inertia::render('admin/pages/users-management/admins/pages/form', [
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

    public function softDelete(int $id): RedirectResponse
    {
        $admin = User::findOrFail($id);
        $admin->delete();
        return redirect()
            ->route('admin.admins.index')
            ->with([
                'success' => 'Delete admin successfully',
            ]);
    }

    public function forceDelete(int $id): RedirectResponse
    {
        $admin = User::withTrashed()->find($id);
        if (!$admin) {
            abort(404, 'Data tidak ditemukan.');
        }

        $admin->forceDelete();
        return redirect()->route('admin.admins.index');
    }


    public function restore(int $id): RedirectResponse
    {
        $admin = User::withTrashed()->findOrFail($id);
        $admin->restore();
        return redirect()
            ->route('admin.admins.index')
            ->with([
                'success' => 'Restore admin successfully',
            ]);
    }
}
