<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'admin' => Role::where('name', 'admin')->first(),
            'merchant' => Role::where('name', 'merchant')->first(),
            'customer' => Role::where('name', 'customer')->first(),
        ];

        foreach ($roles as $roleName => $role) {
            if (!$role) {
                $this->command->error("Role '{$roleName}' is missing. Please run RoleSeeder first.");
                return;
            }
        }

        $users = [
            [
                'full_name' => 'Admin Utama',
                'email' => 'admin@gmail.com',
                'phone' => '081234567890',
                'role' => 'admin',
            ],
            [
                'full_name' => 'Merchant Utama',
                'email' => 'merchant@gmail.com',
                'phone' => '082290920201',
                'role' => 'merchant',
            ],
            [
                'full_name' => 'Customer Utama',
                'email' => 'customer@gmail.com',
                'phone' => '081290920101',
                'role' => 'customer',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'full_name' => $userData['full_name'],
                'email' => $userData['email'],
                'password' => Hash::make('12345678'),
                'phone_number' => $userData['phone'],
            ]);

            $user->assignRole($roles[$userData['role']]);
        }
    }
}
