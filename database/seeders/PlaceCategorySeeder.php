<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\PlaceCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 5 categorías de lugares
        PlaceCategory::factory(5)->create()->each(function ($category) {
            // Asignar una imagen a cada categoría
            $category->image()->save(Image::factory()->make());
        });
    }
}
