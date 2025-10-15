<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PostCategoryController;
use App\Http\Controllers\Admin\HotelController;
use App\Http\Controllers\Admin\AmenityController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// La ruta raíz del admin
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/posts', PostController::class)->except(['show']);
    Route::resource('/post-categories', PostCategoryController::class)->except(['show']);
    Route::resource('/hotels', HotelController::class)->except(['show']);
    Route::resource('/amenities', AmenityController::class)->except(['show']);
