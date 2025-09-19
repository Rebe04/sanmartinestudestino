<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        return Tag::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
            'color' => ['required'],
        ]);

        return Tag::create($data);
    }

    public function show(Tag $tag)
    {
        return $tag;
    }

    public function update(Request $request, Tag $tag)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
            'color' => ['required'],
        ]);

        $tag->update($data);

        return $tag;
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return response()->json();
    }
}
