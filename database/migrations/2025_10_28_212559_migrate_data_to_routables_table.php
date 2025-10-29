<?php

use App\Models\Hotel;
use App\Models\Place;
use App\Models\Restaurant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $oldPlaces = DB::table('route_place')->get();
        foreach ($oldPlaces as $item) {
            DB::table('routables')->insert([
                'route_id' => $item->route_id,
                'routable_id' => $item->place_id,
                'routable_type' => Place::class,
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Migrar datos de la tabla route_restaurant
        $oldRestaurants = DB::table('route_restaurant')->get();
        foreach ($oldRestaurants as $item) {
            DB::table('routables')->insert([
                'route_id' => $item->route_id,
                'routable_id' => $item->restaurant_id,
                'routable_type' => Restaurant::class,
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Migrar datos de la tabla route_hotel
        $oldHotels = DB::table('route_hotel')->get();
        foreach ($oldHotels as $item) {
            DB::table('routables')->insert([
                'route_id' => $item->route_id,
                'routable_id' => $item->hotel_id,
                'routable_type' => Hotel::class,
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Migrar datos de la tabla route_event
        $oldEvents = DB::table('route_event')->get();
        foreach ($oldEvents as $item) {
            DB::table('routables')->insert([
                'route_id' => $item->route_id,
                'routable_id' => $item->event_id,
                'routable_type' => Event::class,
                'order' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('routables', function (Blueprint $table) {
            //
        });
    }
};
