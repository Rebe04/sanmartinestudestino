<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventCategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\FoodCategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\CuadrillasController;
use App\Http\Controllers\MonumentController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

// -- Rutas para Events --
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.show');

// -- Rutas para EventCategories --
Route::get('/event-categories', [EventCategoryController::class, 'index'])->name('event.categories.index');
Route::get('/event-categories/{eventCategory}', [EventCategoryController::class, 'show'])->name('event.categories.show');

// -- Rutas para FoodCategories --
Route::get('/food-categories', [FoodCategoryController::class, 'index'])->name('food.categories.index');
Route::get('/food-categories/{foodCategory}', [FoodCategoryController::class, 'show'])->name('food.categories.show');

// -- Rutas para Hotels --
Route::get('/hotels', [HotelController::class, 'index'])->name('hotels.index');
Route::get('/hotels/{hotel}', [HotelController::class, 'show'])->name('hotels.show');

// -- Rutas para Places --
Route::get('/places', [PlaceController::class, 'index'])->name('places.index');
Route::get('/places/{place}', [PlaceController::class, 'show'])->name('places.show');

// -- Rutas para Restaurants --
Route::get('/restaurants', [RestaurantController::class, 'index'])->name('restaurants.index');
Route::get('/restaurants/{restaurant}', [RestaurantController::class, 'show'])->name('restaurants.show');

// -- Rutas para Routes --
Route::get('/routes', [RouteController::class, 'index'])->name('routes.index');
Route::get('/routes/{route}', [RouteController::class, 'show'])->name('routes.show');

// -- Rutas para Posts --
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/post/{post}', [PostController::class, 'show'])->name('posts.show');

// -- Rutas para PostCategories --
Route::get('/post-categories', [PostCategoryController::class, 'index'])->name('post.categories.index');
Route::get('/post-categories/{postCategory}', [PostCategoryController::class, 'show'])->name('post.categories.show');

Route::get('/nuestra-historia', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/cuadrillas',[CuadrillasController::class, 'index'])->name('cuadrillas');

Route::get('/monuments',[MonumentController::class, 'index'])->name('monuments');

Route::get('/contactanos',[ContactController::class, 'index'])->name('contact-us');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';


Route::get('/admin', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    require __DIR__.'/admin.php';
});
