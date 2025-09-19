<?php

namespace Database\Seeders;

use App\Models\Dish;
use App\Models\Image;
use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurants = Restaurant::all();

        // Asegurar que cada restaurante tenga al menos 3 platos
        $restaurants->each(function ($restaurant) {
            Dish::factory(3)->create([
                'restaurant_id' => $restaurant->id
            ])->each(function ($dish) {
                // Añadir 1 imagen al plato
                $dish->image()->save(Image::factory()->make());
            });
        });
    }
}
