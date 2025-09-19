<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        return Image::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'url' => ['required'],
            'imageable_id' => ['required', 'integer'],
            'imageable_type' => ['required'],
        ]);

        return Image::create($data);
    }

    public function show(Image $image)
    {
        return $image;
    }

    public function update(Request $request, Image $image)
    {
        $data = $request->validate([
            'url' => ['required'],
            'imageable_id' => ['required', 'integer'],
            'imageable_type' => ['required'],
        ]);

        $image->update($data);

        return $image;
    }

    public function destroy(Image $image)
    {
        $image->delete();

        return response()->json();
    }
}
