<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    public function index(){
        return Inertia::render('Hotels/Index', [
            'hotels' => Hotel::paginate(10)
        ]);
    }

    public function show(Hotel $hotel){
        return Inertia::render('Hotels/Show', [
            'hotel' => $hotel
        ]);
    }
}
