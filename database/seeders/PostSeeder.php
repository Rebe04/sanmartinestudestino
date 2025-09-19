<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todos los IDs de usuarios para asignarlos a los posts
        $users = User::pluck('id');

        // Crear 5 categorías de posts
        PostCategory::factory(5)->create()->each(function ($category) use ($users) {

            // Asignar una imagen a la categoría
            $category->image()->save(Image::factory()->make());

            // Crear entre 3 y 7 posts para cada categoría
            Post::factory(rand(3, 7))->create([
                'post_category_id' => $category->id,
                'user_id' => $users->random(), // <-- Asigna un usuario aleatorio
            ])->each(function ($post) {
                // Asignar una imagen a cada post
                $post->image()->save(Image::factory()->make());
            });
        });
    }
}
