<?php

namespace Database\Seeders;

use App\Enums\OrderStatusEnum;
use App\Models\OrderStatus;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    public function run(): void
    {
        $statusSteps = OrderStatusEnum::values();

        // Ambil semua transaksi
        $transactions = Transaction::all();

        foreach ($transactions as $transaction) {
            foreach ($statusSteps as $step) {
                OrderStatus::create([
                    'transaction_id' => $transaction->id,
                    'status' => $step,
                ]);
            }
        }
    }
}
