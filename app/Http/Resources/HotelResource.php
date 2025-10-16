<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
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
            'price_range' => $this->price_range,
            'instagram' => $this->instagram,
            'facebook' => $this->facebook,
            'youtube' => $this->youtube,
            'phone' => $this->phone,
            'email' => $this->email,
            'web' => $this->web,
            'image_url' => $this->whenLoaded('image', function () {
                return $this->image ? asset($this->image->url) : 'https://placehold.co/600x400/2E6230/FFFFFF?text=Hotel';
            }),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')), // Necesitarás crear AmenityResource
        ];
    }
}
