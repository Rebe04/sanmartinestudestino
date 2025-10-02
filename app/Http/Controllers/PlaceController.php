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

        return Inertia::render('Places/Index', [
            'places' => $places,
            'placeCategories' => $placeCategories,
            'filters' => $request->only(['place_category'])
        ]);
    }

    public function show(Place $place){
        return Inertia::render('Places/Show', [
            'place' => $place
        ]);
    }
}
