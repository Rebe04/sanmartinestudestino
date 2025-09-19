<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('subevent_tag', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('subevent_id');
            $table->unsignedBigInteger('tag_id');

            $table->foreign('subevent_id')->references('id')->on('subevents')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subevent_tag');
    }
};
