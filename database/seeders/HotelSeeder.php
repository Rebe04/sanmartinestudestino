<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\Hotel;
use App\Models\Image;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $amenities = Amenity::pluck('id');
        $users = User::pluck('id');

        Hotel::factory(15)->create()->each(function ($hotel) use ($users, $amenities) {
            // Añadir imágenes (mínimo 1)
            $hotel->images()->saveMany(Image::factory(rand(1, 8))->make());
            // Añadir 5+ amenities (muchos a muchos)
            $hotel->amenities()->attach($amenities->random(rand(5, $amenities->count())));

            $hotel->reviews()->saveMany(
                Review::factory(rand(2, 15))->make([
                    'user_id' => $users->random() // Asigna un usuario aleatorio a cada set de reviews
                ])
            );
        });
    }
}
