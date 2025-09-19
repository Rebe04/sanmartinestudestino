<?php

namespace Database\Factories;

use App\Models\FoodCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class FoodCategoryFactory extends Factory
{
    protected $model = FoodCategory::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->word . ' Food';
        return [
            'name' => $this->faker->name(),
            'slug' => Str::slug($name),
            'description' => $this->faker->text(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
