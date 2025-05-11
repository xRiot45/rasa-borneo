<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index_customer(): Response
    {
        return Inertia::render('customer/pages/cart/index');
    }
}
