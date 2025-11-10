<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
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
            'price' => $this->price,
            'description' => $this->description,
            'instagram' => $this->instagram,
            'facebook' => $this->facebook,
            'youtube' => $this->youtube,
            'phone' => $this->phone,
            'email' => $this->email,
            'place_category' => new PlaceCategoryResource($this->whenLoaded('placeCategory')),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'image_url' => $this->whenLoaded('image', fn() => $this->image ? asset($this->image->url) : 'https://placehold.co/600x400/2E6230/FFFFFF?text=Lugar'),
        ];
    }
}
