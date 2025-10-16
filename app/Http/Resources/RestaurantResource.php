<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'address' => $this->address,
            'description' => $this->description,
            'image_url' => $this->whenLoaded('image', fn() => $this->image ? asset($this->image->url) : 'https://placehold.co/600x400/2E6230/FFFFFF?text=Restaurant'),
            'reviews_avg_rating' => $this->whenAggregated('reviews', 'rating', 'avg'),
            'reviews_count' => $this->whenCounted('reviews'),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'food_category' => new FoodCategoryResource($this->whenLoaded('foodCategory')),
            'dishes' => DishResource::collection($this->whenLoaded('dishes')),
        ];
    }
}
