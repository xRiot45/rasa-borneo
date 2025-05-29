<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterOrderSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            TransactionSeeder::class,
            TransactionItemSeeder::class,
            OrderStatusSeeder::class,
        ]);
    }
}
