<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $eventCategories = EventCategory::all();

        // Asegurar que cada categoría tenga al menos 5 eventos
        $eventCategories->each(function ($category) {
            Event::factory(5)->create([
                'event_category_id' => $category->id,
            ])->each(function ($event) {
                // Añadir 1 imagen
                $event->image()->save(Image::factory()->make());
            });
        });
    }
}
