<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterExpenseReportSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ExpenseReportSeeder::class,
            ExpenseReportItemSeeder::class,
        ]);
    }
}
