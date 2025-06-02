<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CourierAssigmentController extends Controller
{
    public function deliveryRequest(): InertiaResponse
    {
        return Inertia::render('courier/pages/delivery-request/index');
    }
}
