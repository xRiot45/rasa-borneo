<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        if (!$adminRole) {
            $this->command->error("Role 'admin' is missing. Please run RoleSeeder first.");
            return;
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
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'full_name' => $userData['full_name'],
                    'email_verified_at' => now(),
                    'password' => Hash::make('password123'),
                    'phone_number' => $userData['phone'],
                ]
            );

            // Fix bagian ini
            $user->assignRole($userData['role']);
        }
    }
}
