<?php

namespace App\Http\Middleware;

use App\Enums\PaymentStatusEnum;
use App\Models\Transaction;
use Closure;
use Illuminate\Http\Request;

class CheckTransactionStatus
{
    public function handle(Request $request, Closure $next): mixed
    {
        $transactionCode = $request->route('transactionCode');
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();

        if (!$transaction) {
            return redirect('/')->with('error', 'Transaksi tidak ditemukan.');
        }

        if ($transaction->payment_status === PaymentStatusEnum::PAID) {
            return redirect()->route('home')->with('message', 'Transaksi sudah selesai dibayar.');
        }

        return $next($request);
    }
}
