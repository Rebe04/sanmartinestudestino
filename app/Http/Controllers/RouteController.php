<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function index(){
        return Inertia::render('Routes/Index', [
            'routes' => Route::paginate(10)
        ]);
    }

    public function show (Route $route){
        return Inertia::render('Routes/Show', [
            'route' => $route
        ]);
    }
}
