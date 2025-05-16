<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TableController extends Controller
{
    public function index_merchant(): InertiaResponse
    {
        return Inertia::render('merchant/store-management/table/index');
    }
}
