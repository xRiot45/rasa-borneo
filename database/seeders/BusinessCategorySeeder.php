<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinessCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Warung Makan',
            'Kafe',
            'Bakery & Toko Kue',
            'Minuman Kekinian',
            'Jajanan Pasar',
            'Makanan Ringan (Snack)',
            'Catering Rumahan',
            'Kedai Kopi',
            'Food Truck',
            'Usaha Kuliner Online',
        ];

        foreach ($categories as $category) {
            DB::table('business_categories')->insert([
                'name' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
