<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCategoryResource;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $postCategories = PostCategory::latest()->paginate(10);
        return Inertia::render('Admin/PostCategories/Index', [
            'postCategories' => PostCategoryResource::collection($postCategories),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PostCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:post_categories,name',
        ]);

        PostCategory::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('admin.post-categories.index')->with('success', 'Categoría creada exitosamente.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostCategory $postCategory)
    {
        return Inertia::render('Admin/PostCategories/Edit', [
            'postCategory' => new PostCategoryResource($postCategory),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostCategory $postCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:post_categories,name,' . $postCategory->id,
        ]);

        $postCategory->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('admin.post-categories.index')->with('success', 'Categoría actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostCategory $postCategory)
    {
        // Opcional: Añadir lógica para prevenir borrar categorías que tienen posts
        if ($postCategory->posts()->count() > 0) {
            return redirect()->route('admin.post-categories.index')->with('error', 'No se puede eliminar una categoría que tiene posts asociados.');
        }

        $postCategory->delete();

        return redirect()->route('admin.post-categories.index')->with('success', 'Categoría eliminada exitosamente.');
    }
}
