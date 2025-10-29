<?php

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
        Schema::dropIfExists('route_place');
        Schema::dropIfExists('route_restaurant');
        Schema::dropIfExists('route_hotel');
        Schema::dropIfExists('route_event');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
