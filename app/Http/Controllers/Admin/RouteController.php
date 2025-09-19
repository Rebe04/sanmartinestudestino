<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        return Route::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'time' => ['required'],
            'description' => ['required'],
        ]);

        return Route::create($data);
    }

    public function show(Route $route)
    {
        return $route;
    }

    public function update(Request $request, Route $route)
    {
        $data = $request->validate([
            'name' => ['required'],
            'time' => ['required'],
            'description' => ['required'],
        ]);

        $route->update($data);

        return $route;
    }

    public function destroy(Route $route)
    {
        $route->delete();

        return response()->json();
    }
}
