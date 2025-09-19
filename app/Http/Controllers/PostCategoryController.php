<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCategoryResource;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('PostCategories/Index', [
            'postsCategories' => PostCategory::paginate(10)
        ]);
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
        $postCategory->load('image', 'posts');


        return Inertia::render('PostCategories/Show', [
            'postCategory' => new PostCategoryResource($postCategory),
        ]);
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
