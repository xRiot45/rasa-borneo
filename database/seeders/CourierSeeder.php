<?php

namespace Database\Seeders;

use App\Enums\GenderEnum;
use App\Enums\VehicleTypeEnum;
use App\Models\Courier;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CourierSeeder extends Seeder
{
    public function run()
    {
        // Pastikan role 'courier' sudah ada
        $courierRole = Role::firstOrCreate(['name' => 'courier']);

        $couriersData = [
            [
                'full_name' => 'Thomas Alberto',
                'email' => 'thomas.alberto@gmail.com',
                'phone_number' => '082278902345',
                'password' => Hash::make('12345678'),
                'vehicle_type' => VehicleTypeEnum::MOTORCYCLE,
                'national_id' => '1748785365',
                'id_card_photo' => '1748785365_KTP.jpeg',
                'age' => 30,
                'birthplace' => 'Jakarta',
                'birthdate' => '1995-05-15',
                'profile_image' => '1748785365_Foto Thomas Alberto.jpeg',
                'gender' => GenderEnum::MALE,
                'driving_license_photo' => '1748785365_KTM.jpeg',
                'license_plate' => 'B1234XYZ',
                'is_online' => true,
                'is_verified' => true,
            ],
            [
                'full_name' => 'Dewi Sartika',
                'email' => 'dewi.sartika@gmail.com',
                'phone_number' => '082267892231',
                'password' => Hash::make('12345678'),
                'vehicle_type' => VehicleTypeEnum::MOTORCYCLE,
                'national_id' => '1748785366',
                'id_card_photo' => '1748785365_KTP.jpeg',
                'age' => 28,
                'birthplace' => 'Bandung',
                'birthdate' => '1996-07-21',
                'profile_image' => '1748785365_Foto Thomas Alberto.jpeg',
                'gender' => GenderEnum::FEMALE,
                'driving_license_photo' => '1748785365_KTM.jpeg',
                'license_plate' => 'D5678ABC',
                'is_online' => false,
                'is_verified' => true,
            ],
            [
                'full_name' => 'Andi Wijaya',
                'email' => 'andi.wijaya@gmail.com',
                'phone_number' => '082267890921',
                'password' => Hash::make('12345678'),
                'vehicle_type' => VehicleTypeEnum::MOTORCYCLE,
                'national_id' => '1748785367',
                'id_card_photo' => '1748785365_KTP.jpeg',
                'age' => 32,
                'birthplace' => 'Surabaya',
                'birthdate' => '1992-11-11',
                'profile_image' => '1748785365_Foto Thomas Alberto.jpeg',
                'gender' => GenderEnum::MALE,
                'driving_license_photo' => '1748785365_KTM.jpeg',
                'license_plate' => 'L9101DEF',
                'is_online' => false,
                'is_verified' => true,
            ],
            [
                'full_name' => 'Rina Putri',
                'email' => 'rina.putri@gmail.com',
                'phone_number' => '082267890923',
                'password' => Hash::make('12345678'),
                'vehicle_type' => VehicleTypeEnum::MOTORCYCLE,
                'national_id' => '1748785368',
                'id_card_photo' => '1748785365_KTP.jpeg',
                'age' => 26,
                'birthplace' => 'Yogyakarta',
                'birthdate' => '1998-03-10',
                'profile_image' => '1748785365_Foto Thomas Alberto.jpeg',
                'gender' => GenderEnum::FEMALE,
                'driving_license_photo' => '1748785365_KTM.jpeg',
                'license_plate' => 'Y2345GHI',
                'is_online' => false,
                'is_verified' => true,
            ],
            [
                'full_name' => 'Budi Santoso',
                'email' => 'budi.santoso@gmail.com',
                'phone_number' => '082256789023',
                'password' => Hash::make('12345678'),
                'vehicle_type' => VehicleTypeEnum::MOTORCYCLE,
                'national_id' => '1748785369',
                'id_card_photo' => '1748785365_KTP.jpeg',
                'age' => 35,
                'birthplace' => 'Medan',
                'birthdate' => '1990-09-05',
                'profile_image' => '1748785365_Foto Thomas Alberto.jpeg',
                'gender' => GenderEnum::MALE,
                'driving_license_photo' => '1748785365_KTM.jpeg',
                'license_plate' => 'M3456JKL',
                'is_online' => true,
                'is_verified' => false,
            ],
        ];

        foreach ($couriersData as $data) {
            // Buat user dulu
            $user = User::create([
                'full_name' => $data['full_name'],
                'email' => $data['email'],
                'phone_number' => $data['phone_number'],
                'password' => $data['password'],
                'email_verified_at' => now(),
            ]);

            // Assign role courier ke user
            $user->assignRole($courierRole);

            // Buat courier terkait
            Courier::create([
                'user_id' => $user->id,
                'vehicle_type' => $data['vehicle_type'],
                'national_id' => $data['national_id'],
                'id_card_photo' => $data['id_card_photo'],
                'age' => $data['age'],
                'birthplace' => $data['birthplace'],
                'birthdate' => $data['birthdate'],
                'profile_image' => $data['profile_image'],
                'gender' => $data['gender'],
                'driving_license_photo' => $data['driving_license_photo'],
                'license_plate' => $data['license_plate'],
                'is_online' => $data['is_online'],
                'is_verified' => $data['is_verified'],
            ]);
        }
    }
}
