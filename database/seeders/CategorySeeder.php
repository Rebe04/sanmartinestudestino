<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use App\Models\FoodCategory;
use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear la FoodCategory "Amacijos" específicamente
        FoodCategory::factory()->create(['name' => 'Amacijos']);
        // Crear las otras 2 FoodCategories
        FoodCategory::factory(2)->create();

        // Crear las 3 EventCategories
        EventCategory::factory(3)->create();

        // Asignar una imagen a cada categoría
        FoodCategory::all()->each(function ($category) {
            $category->image()->save(Image::factory()->make());
        });
        EventCategory::all()->each(function ($category) {
            $category->image()->save(Image::factory()->make());
        });
    }
}
