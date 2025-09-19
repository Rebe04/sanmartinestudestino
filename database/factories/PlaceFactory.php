<?php

namespace Database\Factories;

use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PlaceFactory extends Factory
{
    protected $model = Place::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->company;
        return [
            'name' => $this->faker->name(),
            'slug' => Str::slug($name),
            'address' => $this->faker->address(),
            'price' => $this->faker->word(),
            'description' => $this->faker->text(),
            'instagram' => $this->faker->word(),
            'facebook' => $this->faker->word(),
            'youtube' => $this->faker->word(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
