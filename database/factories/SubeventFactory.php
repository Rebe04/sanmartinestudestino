<?php

namespace Database\Factories;

use App\Models\subevent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class SubeventFactory extends Factory
{
    protected $model = subevent::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'date' => Carbon::now(),
            'duration' => $this->faker->word(),
            'event_id' => $this->faker->randomNumber(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
