<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostCategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Place;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 2)
            ->with(['image', 'user', 'postCategory'])
            ->latest('id')
            ->paginate(4);

        $postCategories = PostCategory::all();

        return Inertia::render('Posts/Index', [
            'posts' => PostResource::collection($posts),
            'post_categories' => PostCategoryResource::collection($postCategories),
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
        $post->load('image', 'user', 'postCategory');
        $related = Post::where('post_category_id', $post->post_category_id)
            ->where('status', 2)
            ->where('id', '!=', $post->id)
            ->with('image')
            ->latest('id')
            ->take(5)
            ->get();

        $postCategories = PostCategory::all();


        return Inertia::render('Posts/Show', [
            'post' => new PostResource($post),
            'related' => PostResource::collection($related),
            'post_category' => PostCategoryResource::collection($postCategories),
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
