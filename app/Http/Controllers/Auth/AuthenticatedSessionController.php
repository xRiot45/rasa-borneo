<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = User::find(Auth::user()->id);
        if ($user->hasRole('admin')) {
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        if ($user->hasRole('merchant')) {
            $merchant = $user->merchant;

            if (!$merchant || !$merchant->is_verified) {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Akun merchant Anda belum diverifikasi.',
                ]);
            }

            return redirect()->intended(route('merchant.dashboard', absolute: false));
        }

        if ($user->hasRole('customer')) {
            return redirect()->intended(route('home', absolute: false));
        }

        if ($user->hasRole('courier')) {
            return redirect()->intended(route('courier.indexCourier', absolute: false));
        }

        return redirect()->intended(route('admin.dashboard', absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
