<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CouponController extends Controller
{
    public function index_merchant(): InertiaResponse
    {
        return Inertia::render('merchant/promotion-management/coupons/index');
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('merchant/promotion-management/coupons/pages/form');
    }
}
