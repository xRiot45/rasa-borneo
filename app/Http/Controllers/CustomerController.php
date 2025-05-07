<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $customers = Customer::withTrashed()->with('user')->get();
        return Inertia::render('admin/users-management/customers/index', [
            'data' => $customers,
        ]);
    }

    public function show(Customer $customer): Response
    {
        $customer->load('user');
        return Inertia::render('admin/users-management/customers/pages/show', [
            'data' => $customer,
        ]);
    }
}
