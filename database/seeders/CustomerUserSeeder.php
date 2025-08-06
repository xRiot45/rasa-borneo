<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Customer;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Enums\GenderEnum;

class CustomerUserSeeder extends Seeder
{
    public function run(): void
    {
        $customerRole = Role::firstOrCreate(['name' => 'customer']);
        $customers = [
            [
                'full_name' => 'Andi Saputra',
                'email' => 'andi@example.com',
                'birthplace' => 'Jakarta',
                'birthdate' => '1990-05-12',
                'gender' => GenderEnum::MALE,
            ],
            [
                'full_name' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'birthplace' => 'Bandung',
                'birthdate' => '1992-07-20',
                'gender' => GenderEnum::MALE,
            ],
            [
                'full_name' => 'Citra Dewi',
                'email' => 'citra@example.com',
                'birthplace' => 'Surabaya',
                'birthdate' => '1995-02-10',
                'gender' => GenderEnum::FEMALE,
            ],
            [
                'full_name' => 'Dewi Lestari',
                'email' => 'dewi@example.com',
                'birthplace' => 'Medan',
                'birthdate' => '1993-11-30',
                'gender' => GenderEnum::FEMALE,
            ],
            [
                'full_name' => 'Eko Prasetyo',
                'email' => 'eko@example.com',
                'birthplace' => 'Semarang',
                'birthdate' => '1989-03-05',
                'gender' => GenderEnum::MALE,
            ],
            [
                'full_name' => 'Fitri Ayu',
                'email' => 'fitri@example.com',
                'birthplace' => 'Makassar',
                'birthdate' => '1996-06-25',
                'gender' => GenderEnum::FEMALE,
            ],
            [
                'full_name' => 'Gilang Permana',
                'email' => 'gilang@example.com',
                'birthplace' => 'Yogyakarta',
                'birthdate' => '1994-09-15',
                'gender' => GenderEnum::MALE,
            ],
            [
                'full_name' => 'Hani Wulandari',
                'email' => 'hani@example.com',
                'birthplace' => 'Palembang',
                'birthdate' => '1991-04-01',
                'gender' => GenderEnum::FEMALE,
            ],
            [
                'full_name' => 'Irfan Maulana',
                'email' => 'irfan@example.com',
                'birthplace' => 'Padang',
                'birthdate' => '1997-08-22',
                'gender' => GenderEnum::MALE,
            ],
            [
                'full_name' => 'Joko Widodo',
                'email' => 'joko@example.com',
                'birthplace' => 'Solo',
                'birthdate' => '1990-12-17',
                'gender' => GenderEnum::MALE,
            ],
        ];

        foreach ($customers as $customer) {
            $phoneNumber = '08' . rand(100000000, 999999999);

            $user = User::create([
                'full_name' => $customer['full_name'],
                'email' => $customer['email'],
                'phone_number' => $phoneNumber,
                'password' => Hash::make('password123'),
                'google_id' => null,
            ]);

            if (method_exists($user, 'assignRole')) {
                $user->assignRole($customerRole->name);
            }

            Customer::create([
                'user_id' => $user->id,
                'birthplace' => $customer['birthplace'],
                'birthdate' => Carbon::parse($customer['birthdate']),
                'gender' => $customer['gender'],
                'profile_image' => null,
            ]);
        }
    }
}
