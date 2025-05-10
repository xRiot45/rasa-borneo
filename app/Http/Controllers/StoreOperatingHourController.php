<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StoreOperatingHourController extends Controller
{
    public function index_merchant(): Response
    {
        return Inertia::render('merchant/store-management/store-operating-hour/index');
    }
}
