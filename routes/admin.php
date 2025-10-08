<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// La ruta raíz del admin
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/posts', PostController::class);
