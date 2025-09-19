<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
            'extract' => ['required'],
            'content' => ['required'],
            'status' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
            'post_category_id' => ['required', 'integer'],
        ]);

        return Post::create($data);
    }

    public function show(Post $post)
    {
        return Inertia::render('Posts/Show', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'name' => ['required'],
            'slug' => ['required'],
            'extract' => ['required'],
            'content' => ['required'],
            'status' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
            'post_category_id' => ['required', 'integer'],
        ]);

        $post->update($data);

        return $post;
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json();
    }
}
