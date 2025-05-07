<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Inertia\Inertia;
use Inertia\Response;

class MerchantController extends Controller
{
    public function index(): Response
    {
        $merchants = Merchant::withTrashed()->get();
        return Inertia::render('admin/users-management/merchants/index', [
            'data' => $merchants
        ]);
    }
}
