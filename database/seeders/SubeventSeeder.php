<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Image;
use App\Models\Subevent;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubeventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = Event::all();
        $tags = Tag::pluck('id');

        // Asegurar que cada evento tenga al menos 4 subeventos
        $events->each(function ($event) use ($tags) {
            Subevent::factory(4)->create([
                'event_id' => $event->id
            ])->each(function ($subevent) use ($tags) {
                // Añadir 1 imagen
                $subevent->image()->save(Image::factory()->make());
                // Añadir 1+ tags
                $subevent->tags()->attach($tags->random(rand(1, 3)));
            });
        });
    }
}
