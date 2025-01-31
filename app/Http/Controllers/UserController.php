<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;


class UserController extends Controller
{

    public function index()
    {
        // Ambil semua pengguna kecuali admin
        $users = User::where('role', '!=', 'admin')
            ->select('id', 'name', 'email', 'is_restricted')
            ->get();


        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function restrict(User $user)
    {
        $user->update(['is_restricted' => true]); // Set user sebagai dibatasi

        return redirect()->back()->with('success', 'User has been restricted.');
    }

    public function unrestrict(User $user)
    {
        $user->update(['is_restricted' => false]); // Buka pembatasan user

        return redirect()->back()->with('success', 'User restriction removed.');
    }
}
