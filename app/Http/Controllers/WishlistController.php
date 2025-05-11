<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index_customer(): Response
    {
        return Inertia::render('customer/pages/wishlist/index');
    }
}
