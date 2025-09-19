<?php

namespace Database\Factories;

use App\Models\Hotel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class HotelFactory extends Factory
{
    protected $model = Hotel::class;

    public function definition(): array
    {
        $name = 'Hotel ' . $this->faker->unique()->company;
        return [
            'name' => $this->faker->name(),
            'slug' => Str::slug($name),
            'address' => $this->faker->address(),
            'description' => $this->faker->text(),
            'price_range' => $this->faker->word(),
            'instagram' => $this->faker->word(),
            'youtube' => $this->faker->word(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'web' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
