<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index()
    {
        return Amenity::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'icon' => ['required'],
        ]);

        return Amenity::create($data);
    }

    public function show(Amenity $amenity)
    {
        return $amenity;
    }

    public function update(Request $request, Amenity $amenity)
    {
        $data = $request->validate([
            'name' => ['required'],
            'icon' => ['required'],
        ]);

        $amenity->update($data);

        return $amenity;
    }

    public function destroy(Amenity $amenity)
    {
        $amenity->delete();

        return response()->json();
    }
}
