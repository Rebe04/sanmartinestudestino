<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    public function index(){
        return Inertia::render('Restaurants/Index', [
            'restaurants' => Restaurant::paginate(10)
        ]);
    }

    public function show(Restaurant $restaurant){
        return Inertia::render('Restaurants/Show', [
            'restaurant' => $restaurant
        ]);
    }
}
