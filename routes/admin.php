<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\PostCategoryController;
use App\Http\Controllers\Admin\HotelController;
use App\Http\Controllers\Admin\AmenityController;
use App\Http\Controllers\Admin\FoodCategoryController;
use App\Http\Controllers\Admin\RestaurantController;
use App\Http\Controllers\Admin\RouteController;
use App\Http\Controllers\Admin\PlaceCategoryController;
use App\Http\Controllers\Admin\PlaceController;
use App\Http\Controllers\Admin\EventCategoryController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\EventController;

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
    Route::resource('/food-categories', FoodCategoryController::class)->except(['show']);
    Route::resource('/restaurants', RestaurantController::class)->except(['show']);
    Route::resource('/routes', RouteController::class)->except(['show']);
    Route::resource('/place-categories', PlaceCategoryController::class)->except(['show']);
    Route::resource('/places', PlaceController::class)->except(['show']);
    Route::resource('/events', EventController::class)->except(['show']);
    Route::resource('/event-categories', EventCategoryController::class)->except(['show']);
    Route::resource('/tags', TagController::class)->except(['show']);
