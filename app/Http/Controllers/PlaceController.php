<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\PlaceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function index(Request $request){
        $placeCategories = PlaceCategory::all();
        $places = Place::query()
            ->when($request->query('place_category'), function ($query, $placeCategory) {
                return $query->where('place_category_id', $placeCategory);
            })
            ->with('image', 'placeCategory')
            ->latest('id')
            ->paginate(5)
            ->withQueryString();

        $firstPlace = $places->first();
        $ogImage = null;

        if ($firstPlace && $firstPlace->image) {
            // Si el primer lugar existe y tiene una imagen, se usa su URL
            $ogImage = asset($firstPlace->image->url);
        } else {
            // Si no, se usa una imagen por defecto.
            $ogImage = asset('images/seo/places-default.webp');
        }

        return Inertia::render('Places/Index', [
            'places' => $places,
            'placeCategories' => $placeCategories,
            'filters' => $request->only(['place_category']),

            'seo' => [
            'title' => "Sitios de Interés Turístico",
                'description' => "San Martín de los Llanos, el municipio más antiguo del Meta, te invita a sumergirte en su historia viva, su cultura emblemática y sus paisajes únicos. Fundado en 1585 como Medina de las Torres y refundado en 1641 como San Martín del Puerto, este rincón del Meta conserva intacta su autenticidad. A tan sólo aproximadamente 70 km de Villavicencio, sus campos, su gente y sus tradiciones te esperan.",
            'image' => $ogImage
        ]
        ]);
    }

    public function show(Place $place){
        $placeCategories = PlaceCategory::all();
        $places = Place::take(5)->with('image')->latest()->get();
        $place->load('images','image', 'placeCategory');
        return Inertia::render('Places/Show', [
            'place' => $place,
            'placeCategories' => $placeCategories,
            'places' => $places,

            'seo' => [
                'title' => $place->name,
                'description' => $place->description,
                'image' => $place->image->url,
            ]
        ]);
    }
}
