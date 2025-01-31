<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat user admin jika belum ada
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // Cek berdasarkan email
            [
                'name' => 'Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'), // Ganti dengan password yang lebih aman
                'role' => 'admin', // Pastikan ada kolom role di tabel users
            ]
        );
    }
}
