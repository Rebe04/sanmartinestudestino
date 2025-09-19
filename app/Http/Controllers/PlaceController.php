<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    public function index(){
        return Inertia::render('Places/Index', [
            'places' => Place::paginate(10)
        ]);
    }

    public function show(Place $place){
        return Inertia::render('Places/Show', [
            'place' => $place
        ]);
    }
}
