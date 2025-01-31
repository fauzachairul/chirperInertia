<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRestriction
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Jika user login & dibatasi, larang posting chirp
        if ($user && $user->is_restricted) {
            return redirect()->route('chirps.index')->with('error', 'Anda tidak diizinkan untuk memposting chirp.');
        }

        return $next($request);
    }
}
