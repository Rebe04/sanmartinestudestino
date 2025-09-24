<?php

namespace Database\Factories;

use App\Models\PlaceCategory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class PlaceCategoryFactory extends Factory
{
    protected $model = PlaceCategory::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true);
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
