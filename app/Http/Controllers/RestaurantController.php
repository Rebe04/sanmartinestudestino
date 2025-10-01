<?php

namespace App\Http\Controllers;

use App\Models\FoodCategory;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    public function index(Request $request){
        $foodCategories = FoodCategory::all();

        $restaurants = Restaurant::query()
            ->when($request->query('food_category'), function ($query, $foodCategory) {
                return $query->where('food_category_id', $foodCategory);
            })
            ->with('image', 'foodCategory')
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->latest('id') // Ordena por los más nuevos
            ->paginate(10) // Aplica la paginación a la consulta construida
            ->withQueryString();
        return Inertia::render('Restaurants/Index', [
            'restaurants' => $restaurants,
            'foodCategories' => $foodCategories,
            'filters' => $request->only(['food_category']),
        ]);
    }

    public function show(Restaurant $restaurant){
        $restaurant->load('images', 'dishes.image', 'foodCategory')->loadCount('reviews')->loadAvg('reviews', 'rating');
        $reviews = $restaurant->reviews() // Obtiene el constructor de la consulta de la relación
        ->with('user') // Carga la información del usuario para cada reseña
        ->latest() // Ordena las reseñas de la más nueva a la más antigua
        ->paginate(5, ['*'], 'reviews_page'); // Pagina 5 resultados por página

        return Inertia::render('Restaurants/Show', [
            'restaurant' => $restaurant,
            'reviews' => $reviews,
        ]);
    }
}
