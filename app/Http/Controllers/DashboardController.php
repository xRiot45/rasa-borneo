<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index_admin(): Response
    {
        return Inertia::render('admin/dashboard');
    }

    public function index_merchant(): Response
    {
        return Inertia::render('merchant/dashboard');
    }
}
