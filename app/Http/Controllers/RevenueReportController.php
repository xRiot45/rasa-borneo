<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class RevenueReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        return Inertia::render('merchant/financial-management/revenue-report/index');
    }
}
