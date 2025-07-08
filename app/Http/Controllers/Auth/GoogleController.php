<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
            $user = User::updateOrCreate(
                [
                    'email' => $googleUser->getEmail(),
                ],
                [
                    'full_name' => $googleUser->getName(),
                    'google_id' => $googleUser->getId(),
                ],
            );

            $user
                ->forceFill([
                    'email_verified_at' => now(),
                ])
                ->save();

            if (!$user->hasRole('customer')) {
                $user->assignRole('customer');
            }

            if (!$user->customer) {
                $user->customer()->create([
                    'profile_image' => $googleUser->getAvatar(),
                ]);
            }

            Auth::login($user);

            return redirect()->route('home');
        } catch (\Exception $e) {
            return redirect()
                ->route('login')
                ->withErrors('Gagal login dengan Google: ' . $e->getMessage());
        }
    }
}
