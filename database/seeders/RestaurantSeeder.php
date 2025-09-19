<?php

namespace Database\Seeders;

use App\Models\FoodCategory;
use App\Models\Image;
use App\Models\Restaurant;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $foodCategories = FoodCategory::all();
        $users = User::pluck('id');

        // Asegurar que cada categoría tenga al menos 5 restaurantes
        $foodCategories->each(function ($category) use ($users) {
            Restaurant::factory(5)->create([
                'food_category_id' => $category->id,
            ])->each(function ($restaurant) use ($users) {
                // Añadir imágenes (mínimo 1)
                $restaurant->images()->saveMany(Image::factory(rand(1, 5))->make());
                // Añadir reviews (mínimo 1)
                $restaurant->reviews()->saveMany(Review::factory(rand(1, 10))->make([
                    'user_id' => $users->random()
                ]));
            });
        });
    }
}
