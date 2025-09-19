<?php

namespace Database\Factories;

use App\Models\Review;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'comment' => $this->faker->word(),
            'rating' => $this->faker->numberBetween(1, 5),
            'user_id' => $this->faker->randomNumber(),
            'reviewable_id' => $this->faker->randomNumber(),
            'reviewable_type' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
