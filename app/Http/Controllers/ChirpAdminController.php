<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Chirp;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;

class ChirpAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Chirps', [

            // 'chirps' => Chirp::with('user:id,name')->latest()->get(['id', 'message', 'media', 'created_at', 'user_id']),
            'chirps' => Chirp::with('user:id,name')->latest()->get(),

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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255', // validasi message
            'media' => 'nullable|file|mimes:jpg,webp,jpeg,png,mp4|max:10240', // Validasi media
        ]);

        if ($request->hasFile('media')) {
            $validated['media'] = $request->file('media')->store('media', 'public'); // Simpan file ke storage
        }

        $request->user()->chirps()->create($validated);

        return redirect(route('admin.chirps'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Chirp $chirp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chirp $chirp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chirp $chirp): RedirectResponse
    {
        Gate::authorize('update', $chirp);

        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $chirp->update($validated);

        return redirect(route('admin.chirps'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chirp $chirp): RedirectResponse
    {
        // Gate::authorize('delete', $chirp);

        if ($chirp->media) {
            Storage::disk('public')->delete($chirp->media); // Hapus file dari storage public
        }
        $chirp->delete();

        return redirect(route('admin.report.index'));
    }


    public function getChirpStatistics(Request $request): Response
    {
        $timePeriod = $request->input('period', 'daily'); // Default: daily

        $stats = [];
        $labels = [];

        if ($timePeriod === 'daily') {
            for ($i = 6; $i >= 0; $i--) {
                $date = now()->subDays($i)->format('Y-m-d');
                $labels[] = now()->subDays($i)->format('d M');
                $stats[] = Chirp::whereDate('created_at', $date)->count();
            }
        } elseif ($timePeriod === 'weekly') {
            for ($i = 6; $i >= 0; $i--) {
                $startOfWeek = now()->subWeeks($i)->startOfWeek()->format('Y-m-d');
                $endOfWeek = now()->subWeeks($i)->endOfWeek()->format('Y-m-d');
                $labels[] = "Week " . now()->subWeeks($i)->format('W');
                $stats[] = Chirp::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();
            }
        } elseif ($timePeriod === 'monthly') {
            for ($i = 6; $i >= 0; $i--) {
                $month = now()->subMonths($i)->format('M Y');
                $labels[] = $month;
                $stats[] = Chirp::whereMonth('created_at', now()->subMonths($i)->month)->count();
            }
        }

        return Inertia::render('Admin/Dashboard', [
            'labels' => $labels,
            'data' => $stats,
            'selectedPeriod' => $timePeriod,
        ]);
    }
}
