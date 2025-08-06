<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Andes2912\IndoBank\RawDataGetter;
use Illuminate\Support\Facades\DB;

class IndoBankSeeder extends Seeder
{
    public function run()
    {
        $banks = RawDataGetter::getBanks();
        DB::table('banks')->insert($banks);
    }
}
