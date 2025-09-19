<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Hotel;
use App\Models\Image;
use App\Models\Place;
use App\Models\Restaurant;
use App\Models\Route;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RouteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener los IDs de las entidades que vamos a relacionar
        $places = Place::pluck('id');
        $events = Event::pluck('id');
        $restaurants = Restaurant::pluck('id');
        $hotels = Hotel::pluck('id');

        // Crear 8 rutas
        Route::factory(8)->create()->each(function ($route) use ($places, $events, $restaurants, $hotels) {

            // Adjuntar un número aleatorio de cada entidad a la ruta
            // Por ejemplo, entre 1 y 3 de cada uno

            $route->places()->attach(
                $places->random(rand(1, 3))
            );

            $route->events()->attach(
                $events->random(rand(1, 3))
            );

            $route->restaurants()->attach(
                $restaurants->random(rand(1, 3))
            );

            $route->hotels()->attach(
                $hotels->random(rand(1, 3))
            );

            // Asignar una única imagen polimórfica a la ruta
            $route->image()->save(Image::factory()->make());
        });
    }
}
