<?php

namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;

class PostCategoryController extends Controller
{
    public function index()
    {
        return PostCategory::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
        ]);

        return PostCategory::create($data);
    }

    public function show(PostCategory $postCategory)
    {
        return $postCategory;
    }

    public function update(Request $request, PostCategory $postCategory)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
        ]);

        $postCategory->update($data);

        return $postCategory;
    }

    public function destroy(PostCategory $postCategory)
    {
        $postCategory->delete();

        return response()->json();
    }
}
