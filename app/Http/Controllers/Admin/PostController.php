<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtiene los posts paginados, con sus relaciones
        $posts = Post::with(['user', 'postCategory', 'image'])
            ->latest()
            ->paginate(10);

        // Renderiza el componente de React para la tabla de posts
        return Inertia::render('Admin/Posts/Index', [
            'posts' => PostResource::collection($posts),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $postCategories = PostCategory::all();

        return Inertia::render('Admin/Posts/Create', [
            'postCategories' => PostCategoryResource::collection($postCategories),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:posts,name',
            'extract' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:1,2',
            'post_category_id' => 'nullable|exists:post_categories,id',
            'new_category_name' => 'nullable|string|max:255|unique:post_categories,name',
            'image' => 'required|image|mimes:webp|max:1024',
        ]);

        $postCategoryId = $request->post_category_id;

        if ($request->filled('new_category_name')) {
            $newCategory = PostCategory::create([
                'name' => $request->new_category_name,
                'slug' => Str::slug($request->new_category_name),
            ]);
            $postCategoryId = $newCategory->id;
        }

        if (!$postCategoryId) {
            return back()->withErrors(['post_category_id' => 'La categoría es obligatoria.']);
        }

        $cleanContent = clean($request->input('content'));

        // Creación del Post
        $post = Post::create([
            'name' => $validatedData['name'],
            'slug' => Str::slug($validatedData['name']),
            'extract' => $validatedData['extract'],
            'content' => $cleanContent,
            'status' => $validatedData['status'],
            'post_category_id' => $postCategoryId,
            'user_id' => auth()->id(),
        ]);

        // Manejo de la imagen
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');

            $post->image()->create([
                'url' => '/storage/' . $path
            ]);
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        // Carga las relaciones necesarias para el formulario
        $post->load('image', 'postCategory');
        $postCategories = PostCategory::all();

        return Inertia::render('Admin/Posts/Edit', [
            'post' => new PostResource($post), // Pasamos el post que vamos a editar
            'postCategories' => PostCategoryResource::collection($postCategories),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        // 1. Validación (similar a store, pero ignorando el post actual en 'unique')
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('posts')->ignore($post->id)],
            'extract' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:1,2',
            'post_category_id' => 'nullable|exists:post_categories,id',
            'new_category_name' => 'nullable|string|max:255|unique:post_categories,name',
            // La imagen es opcional al actualizar
            'image' => 'nullable|image|mimes:webp|max:1024',
        ]);

        $postCategoryId = $request->post_category_id;

        // 2. Lógica para crear la categoría si es necesario
        if ($request->filled('new_category_name')) {
            $newCategory = PostCategory::create([
                'name' => $request->new_category_name,
                'slug' => Str::slug($request->new_category_name),
            ]);
            $postCategoryId = $newCategory->id;
        }

        if (!$postCategoryId) {
            return back()->withErrors(['post_category_id' => 'La categoría es obligatoria.']);
        }
        $cleanContent = clean($request->input('content'));

        // 3. Actualización del Post
        $post->update([
            'name' => $validatedData['name'],
            'slug' => Str::slug($validatedData['name']),
            'extract' => $validatedData['extract'],
            'content' => $cleanContent,
            'status' => $validatedData['status'],
            'post_category_id' => $postCategoryId,
        ]);

        // 4. Manejo de la actualización de la imagen
        if ($request->hasFile('image')) {
            // Si el post ya tenía una imagen, la borramos
            if ($post->image) {
                // Borra el archivo del disco
                Storage::disk('public')->delete(str_replace('/storage/', '', $post->image->url));
                // Borra el registro de la base de datos
                $post->image()->delete();
            }

            // Guarda la nueva imagen
            $path = $request->file('image')->store('posts', 'public');
            $post->image()->create(['url' => '/storage/' . $path]);
        }

        return redirect()->route('admin.posts.index')->with('success', 'Post actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
