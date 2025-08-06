<?php

namespace Database\Seeders;

use App\Models\Fee;
use Illuminate\Database\Seeder;

class FeeSeeder extends Seeder
{
    public function run(): void
    {
        Fee::updateOrCreate(['type' => 'delivery_fee'], ['amount' => 10000]);
        Fee::updateOrCreate(['type' => 'application_service_fee'], ['amount' => 2000]);
    }
}
