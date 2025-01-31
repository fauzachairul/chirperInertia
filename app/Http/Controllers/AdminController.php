<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Report;
use App\Models\UserReport;
use Illuminate\Http\Request;
use Illuminate\Contracts\View\View;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Dashboard', [
            'userCount' => User::where('role', 'user')->count(),
            'chirpReportCount' => Report::count(),
            'userReportCount' => UserReport::count(),
        ]);

        dd([
            'userCount' => $userCount,
            'chirpReportCount' => $chirpReportCount,
            'userReportCount' => $userReportCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
