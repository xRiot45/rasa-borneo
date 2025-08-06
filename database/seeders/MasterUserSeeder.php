<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MasterUserSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            CourierUserSeeder::class,
            MerchantUserSeeder::class,
            CustomerUserSeeder::class,
        ]);
    }
}
