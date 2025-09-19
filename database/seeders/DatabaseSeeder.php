<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Esteban Benitez',
            'email' => 'estebanbenitez@gmail.com',
        ]);

        // 1. Poblar modelos sin dependencias
        $this->call([
            UserSeeder::class,
            AmenitySeeder::class,
            TagSeeder::class,
            BannerSeeder::class,
            CategorySeeder::class, // Crea EventCategory y FoodCategory
            PlaceSeeder::class,
        ]);

        // 2. Poblar modelos con dependencias básicas
        $this->call([
            RestaurantSeeder::class,
            EventSeeder::class,
            HotelSeeder::class,
            RouteSeeder::class,
            PostSeeder::class,
        ]);

        // 3. Poblar modelos que dependen de los anteriores
        $this->call([
            DishSeeder::class,
            SubeventSeeder::class,
        ]);
    }
}
