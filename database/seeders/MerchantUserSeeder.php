<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Merchant;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class MerchantUserSeeder extends Seeder
{
    public function run(): void
    {
        $merchantRole = Role::where('name', 'merchant')->first();

        $merchantsData = [
            ['full_name' => 'Rumah Makan Sederhana', 'email' => 'sederhana@example.com'],
            ['full_name' => 'Warung Nasi Padang Maknyus', 'email' => 'nasipadang@example.com'],
            ['full_name' => 'Ayam Geprek Bensu', 'email' => 'gepreakbensu@example.com'],
            ['full_name' => 'Bakso Malang Mantap', 'email' => 'baksomalang@example.com'],
            ['full_name' => 'Mie Ayam Jakarta', 'email' => 'mieayamjakarta@example.com'],
            ['full_name' => 'Warung Soto Lamongan', 'email' => 'sotolamongan@example.com'],
            ['full_name' => 'Nasi Goreng Kambing Kebon Sirih', 'email' => 'nasigoreng@example.com'],
            ['full_name' => 'Warung Pecel Lele Lela', 'email' => 'pecellele@example.com'],
            ['full_name' => 'Rumah Makan Padang Pariaman', 'email' => 'padangpariaman@example.com'],
            ['full_name' => 'Warung Tegal Mantap Jiwa', 'email' => 'warteg@example.com'],
        ];

        foreach ($merchantsData as $data) {
            $phoneNumber = '08' . rand(100000000, 999999999);

            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'full_name' => $data['full_name'],
                    'google_id' => null,
                    'password' => Hash::make('password123'),
                    'phone_number' => $phoneNumber,
                    'email_verified_at' => now(),
                ]
            );

            if (!$user->hasRole('merchant')) {
                $user->assignRole($merchantRole);
            }
            Merchant::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'id_card_photo' => '/storage/merchant_assets/id_card_photo/1750322668_KTP.jpeg',
                    'business_name' => $data['full_name'],
                    'business_phone' => $user->phone_number,
                    'business_email' => $data['email'],
                    'postal_code' => '40123',
                    'business_description' => 'Rumah makan yang menyajikan hidangan lezat dan harga terjangkau.',
                    'business_address' => 'Jl. Contoh Alamat No. 123, Jakarta',
                    'business_category_id' => 1,
                    'bank_code' => '014', // contoh bank BCA
                    'bank_account_number' => '1234567890',
                    'bank_account_name' => $data['full_name'],
                    'tax_identification_number' => '9876543210',
                    'is_verified' => true,
                    'slug' => Str::slug($data['full_name']),
                ]
            );
        }
    }
}
