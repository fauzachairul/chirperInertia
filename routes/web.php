<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\CheckUserRestriction;
use App\Http\Controllers\ChirpAdminController;
use App\Http\Controllers\UserReportController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->group(function () {
    //route untuk dashboard admin
    Route::get('/admin/dashboard', [AdminController::class, 'index'])
        ->name('admin.dashboard');

    //route untuk menampilkan chirp dihalaman admin
    Route::get('/admin/chirps', [ChirpAdminController::class, 'index'])
        ->name('admin.chirps');

    //route untuk melihat report chirp yang melanggar standar komunitas
    Route::get('/admin/report', [ReportController::class, 'index'])
        ->name('admin.report.index');

    // route untuk admin agar bisa menghapus chirp yang melanggar standar komunitas
    Route::delete('/admin/chirps/{chirp}', [ChirpAdminController::class, 'destroy'])
        ->name('admin.chirps.destroy');

    //route untuk menampilkan users di halaman admin
    Route::get('admin/users', [UserController::class, 'index'])
        ->name('users.index');

    //route untuk menampilkan users yang dilaporkan karena melanggar standar komunitas
    Route::get('/admin/user-reports', [UserReportController::class, 'index'])->name('admin.user.reports');


    //route untuk membatasi akun user
    Route::patch('/admin/users/{user}/restrict', [UserController::class, 'restrict'])
        ->name('admin.users.restrict');

    //route untuk membuka/membatalkan pembatasan user
    Route::patch('/admin/users/{user}/unrestrict', [UserController::class, 'unrestrict'])
        ->name('admin.users.unrestrict');

    //untuk menampilkan statistik jumlah postingan chirp
    Route::get('/admin/chirp-statistics', [ChirpAdminController::class, 'getChirpStatistics'])
        ->name('admin.chirpStatistics');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//route report chirp
Route::post('/reports', [ReportController::class, 'store'])
    ->name('reports.store')
    ->middleware(['auth', 'verified']);

//route report user
Route::post('/user/reports/{user}', [UserReportController::class, 'store'])
    ->middleware(['auth', 'verified'])
    ->name('user.reports.store');

//route chirp user
Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified', CheckUserRestriction::class]);

require __DIR__ . '/auth.php';
