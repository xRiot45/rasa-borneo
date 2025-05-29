<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProfitReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        return Inertia::render('merchant/financial-management/profit-report/index');
    }
}
