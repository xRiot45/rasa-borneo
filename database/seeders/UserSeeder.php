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
            'admin'   => Role::where('name', 'admin')->first(),
            'merchant' => Role::where('name', 'merchant')->first(),
            'cashier' => Role::where('name', 'cashier')->first(),
            'courier' => Role::where('name', 'courier')->first(),
            'chef'    => Role::where('name', 'chef')->first(),
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
                'email'     => 'admin@gmail.com',
                'phone'     => '081234567890',
                'role'      => 'admin',
            ],
            [
                'full_name' => 'Kasir Utama',
                'email'     => 'cashier@gmail.com',
                'phone'     => '082292092345',
                'role'      => 'cashier',
            ],
            [
                'full_name' => 'Kurir Utama',
                'email'     => 'courier@gmail.com',
                'phone'     => '082278902345',
                'role'      => 'courier',
            ],
            [
                'full_name' => 'Chef Utama',
                'email'     => 'chef@gmail.com',
                'phone'     => '082290920202',
                'role'      => 'chef',
            ],
            [
                'full_name' => 'Merchant Utama',
                'email'     => 'merchant@gmail.com',
                'phone'     => '082290920201',
                'role'      => 'merchant',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'full_name'    => $userData['full_name'],
                'email'        => $userData['email'],
                'password'     => Hash::make('12345678'),
                'phone_number' => $userData['phone'],
            ]);

            $user->assignRole($roles[$userData['role']]);
        }
    }
}
