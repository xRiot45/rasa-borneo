<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRegisterRequest;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomerRegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register/register-customer');
    }

    public function store(CustomerRegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = User::create($validated);

        $user->assignRole('customer');

        Customer::create([
            'user_id' => $user->id,
            'birthplace' => $validated['birthplace'] ?? null,
            'birthdate' => $validated['birthdate'] ?? null,
            'gender' => $validated['gender'] ?? null,
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
