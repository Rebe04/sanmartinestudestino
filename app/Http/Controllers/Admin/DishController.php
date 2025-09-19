<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function index()
    {
        return Dish::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'restaurant_id' => ['required', 'integer'],
        ]);

        return Dish::create($data);
    }

    public function show(Dish $dish)
    {
        return $dish;
    }

    public function update(Request $request, Dish $dish)
    {
        $data = $request->validate([
            'name' => ['required'],
            'restaurant_id' => ['required', 'integer'],
        ]);

        $dish->update($data);

        return $dish;
    }

    public function destroy(Dish $dish)
    {
        $dish->delete();

        return response()->json();
    }
}
