<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->sentence(4); // Se llamaba 'title' antes, ahora 'name'
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'extract' => $this->faker->sentence(15), // <-- Nuevo campo
            'content' => $this->faker->paragraphs(5, true),
            'status' => $this->faker->randomElement([1, 2]), // <-- Nuevo campo (1=borrador, 2=publicado)
        ];
    }
}
