<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CourierController extends Controller
{
    public function indexAdmin(): InertiaResponse
    {
        return Inertia::render('admin/users-management/couriers/index');
    }
}
