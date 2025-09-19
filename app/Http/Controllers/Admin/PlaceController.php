<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index()
    {
        return Place::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'address' => ['required'],
            'price' => ['required'],
            'description' => ['required'],
            'instagram' => ['nullable'],
            'facebook' => ['nullable'],
            'youtube' => ['nullable'],
            'phone' => ['nullable'],
            'email' => ['nullable', 'email', 'max:254'],
        ]);

        return Place::create($data);
    }

    public function show(Place $place)
    {
        return $place;
    }

    public function update(Request $request, Place $place)
    {
        $data = $request->validate([
            'name' => ['required'],
            'address' => ['required'],
            'price' => ['required'],
            'description' => ['required'],
            'instagram' => ['nullable'],
            'facebook' => ['nullable'],
            'youtube' => ['nullable'],
            'phone' => ['nullable'],
            'email' => ['nullable', 'email', 'max:254'],
        ]);

        $place->update($data);

        return $place;
    }

    public function destroy(Place $place)
    {
        $place->delete();

        return response()->json();
    }
}
