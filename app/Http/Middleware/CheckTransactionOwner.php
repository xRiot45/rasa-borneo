<?php

namespace App\Http\Middleware;

use App\Models\Customer;
use App\Models\Transaction;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckTransactionOwner
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        $transactionCode = $request->route('transactionCode');
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();

        if (!$transaction) {
            abort(404, 'Transaction not found.');
        }

        if ($transaction->customer_id !== $customerId) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
