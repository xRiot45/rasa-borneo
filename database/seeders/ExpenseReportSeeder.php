<?php

namespace Database\Seeders;

use App\Models\ExpenseReport;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class ExpenseReportSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 50; $i++) {
            ExpenseReport::create([
                'merchant_id' => 2,
                'report_date' => Carbon::create(2025, 5, rand(1, 31))->format('Y-m-d'),
                'description' => 'Expense report description ' . ($i + 1),
                'total_expense' => rand(100000, 1000000),
            ]);
        }
    }
}
