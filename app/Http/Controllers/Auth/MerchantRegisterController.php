<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class MerchantRegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register/register-merchant');
    }
}
