<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index()
    {
        return Restaurant::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'address' => ['required'],
            'description' => ['required'],
            'food_category_id' => ['required', 'integer'],
        ]);

        return Restaurant::create($data);
    }

    public function show(Restaurant $restaurant)
    {
        return $restaurant;
    }

    public function update(Request $request, Restaurant $restaurant)
    {
        $data = $request->validate([
            'name' => ['required'],
            'address' => ['required'],
            'description' => ['required'],
            'food_category_id' => ['required', 'integer'],
        ]);

        $restaurant->update($data);

        return $restaurant;
    }

    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();

        return response()->json();
    }
}
