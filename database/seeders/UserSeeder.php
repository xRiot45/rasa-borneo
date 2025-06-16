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
            'courier' => Role::where('name', 'courier')->first(),
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
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'full_name' => $userData['full_name'],
                'email' => $userData['email'],
                'email_verified_at' => now(),
                'password' => Hash::make('12345678'),
                'phone_number' => $userData['phone'],
            ]);

            $user->assignRole($roles[$userData['role']]);
        }
    }
}
