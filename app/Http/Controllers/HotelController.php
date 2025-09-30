<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    public function index(Request $request){
        $priceRanges = Hotel::query()->select('price_range')->distinct()->get()->pluck('price_range');
        $hotels = Hotel::query()
            ->when($request->query('price_range'), function ($query, $priceRange) {
                return $query->where('price_range', $priceRange);
            })
            ->with('image')
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Hotels/Index', [
            'hotels' => $hotels,
            'filters' => $request->only(['price_range']),
            'priceRanges' => $priceRanges,
        ]);
    }

    public function show(Hotel $hotel){
        $hotel->load('images', 'amenities')->loadCount('reviews')->loadAvg('reviews', 'rating');
        $reviews = $hotel->reviews() // Obtiene el constructor de la consulta de la relación
        ->with('user') // Carga la información del usuario para cada reseña
        ->latest() // Ordena las reseñas de la más nueva a la más antigua
        ->paginate(5, ['*'], 'reviews_page'); // Pagina 5 resultados por página
        return Inertia::render('Hotels/Show', [
            'hotel' => $hotel,
            'reviews' => $reviews, // 3. Pasa el objeto de paginación de reseñas como una prop separada
        ]);
    }
}
