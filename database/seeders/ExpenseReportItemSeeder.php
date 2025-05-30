<?php

namespace Database\Seeders;

use App\Models\ExpenseReport;
use App\Models\ExpenseReportItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseReportItemSeeder extends Seeder
{
    public function run(): void
    {
        $expenseReports = ExpenseReport::all();

        foreach ($expenseReports as $report) {
            // Untuk tiap report, buat 1–3 item
            $itemCount = rand(1, 3);
            for ($j = 0; $j < $itemCount; $j++) {
                ExpenseReportItem::create([
                    'expense_report_id' => $report->id,
                    'name' => 'Item ' . ($j + 1) . ' for Report ' . $report->id,
                    'category_id' => 1,
                    'description' => 'Description for item ' . ($j + 1),
                    'amount' => rand(10000, 200000),
                ]);
            }
        }
    }
}
