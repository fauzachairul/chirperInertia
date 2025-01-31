<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserReport;
use Illuminate\Http\Request;

class UserReportController extends Controller
{
    public function index()
    {
        $reports = UserReport::with(['reporter:id,name', 'reportedUser:id,name,is_restricted'])->latest()->get();

        return inertia('Admin/UserReports', [
            'reports' => $reports,
        ]);
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'reason' => 'required|string|max:255',
        ]);

        UserReport::create([
            'reporter_id' => $request->user()->id, // Menggunakan request->user()
            'reported_user_id' => $user->id,
            'reason' => $request->reason,
        ]);

        return redirect()->back()->with('message', 'User has been reported.');
    }
}
