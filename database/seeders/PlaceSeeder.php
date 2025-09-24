<?php

namespace Database\Seeders;

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
        $placeCategoryIds = PlaceCategory::pluck('id');
        // Se Crean 15 lugares
        Place::factory(15)->create([
            // Para cada lugar creado, se asigna un ID de categoría aleatorio
            'place_category_id' => $placeCategoryIds->random(),
        ]);
    }
}
