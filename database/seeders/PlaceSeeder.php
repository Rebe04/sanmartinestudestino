<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Place;
use App\Models\PlaceCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $placeCategories = PlaceCategory::all();
        // Se Crean 15 lugares
        $placeCategories->each(function ($category) {
            Place::factory(5)->create([
                'place_category_id' => $category->id,
            ])->each(function ($place) {
                    // Añadir imágenes (mínimo 1)
                    $place->images()->saveMany(Image::factory(rand(1, 5))->make());
                });
        });
    }
}
