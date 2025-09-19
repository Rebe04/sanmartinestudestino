<?php

namespace App\Http\Controllers;

use App\Models\Post; // Asegúrate de importar tu modelo Post
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Muestra la página de inicio con todos los datos necesarios.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // --- Lógica para obtener los posts ---
        $posts = Post::with(['postCategory', 'user', 'image'])
            ->latest()
            ->take(3)
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'name' => $post->name,
                    'extract' => $post->extract,
                    'slug' => $post->slug,
                    'created_at_formatted' => $post->created_at->format('d M Y'),
                    'image_url' => $post->image ? $post->image->url : 'https://placehold.co/800x600/2E6230/FFFFFF?text=Imagen',
                    'category' => [
                        'name' => $post->postCategory->name,
                        'slug' => $post->postCategory->slug,
                    ],
                    'user' => [
                        'name' => $post->user->name,
                    ],
                ];
            });


        // --- Renderizamos la página Welcome y le pasamos todos los datos ---
        return Inertia::render('Welcome', [
            'posts' => $posts,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
