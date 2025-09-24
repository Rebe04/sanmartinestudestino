<?php

namespace App\Http\Controllers;

use App\Models\PlaceCategory;
use Illuminate\Http\Request;

class PlaceCategoryController extends Controller
{
    public function index()
    {
        return PlaceCategory::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
        ]);

        return PlaceCategory::create($data);
    }

    public function show(PlaceCategory $placeCategory)
    {
        return $placeCategory;
    }

    public function update(Request $request, PlaceCategory $placeCategory)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
        ]);

        $placeCategory->update($data);

        return $placeCategory;
    }

    public function destroy(PlaceCategory $placeCategory)
    {
        $placeCategory->delete();

        return response()->json();
    }
}
