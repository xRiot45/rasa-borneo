<?php

namespace App\Http\Controllers;

use App\Models\RevenueReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class RevenueReportController extends Controller
{
    public function indexMerchant(): InertiaResponse
    {
        $revenueReports = RevenueReport::all();
        

        return Inertia::render('merchant/financial-management/revenue-report/index');
    }
}
