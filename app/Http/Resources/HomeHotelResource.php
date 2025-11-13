<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeHotelResource extends JsonResource
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
            'slug' => $this->slug,
            'nombre' => $this->name,
            'direccion' => $this->address,

            'imagen' => $this->whenLoaded('image',
                fn() => $this->image ? asset($this->image->url) : 'https://placehold.co/600x400/2E6230/FFFFFF?text=Hotel'
            ),

            'precioPorNoche' => $this->price_range,
        ];
    }
}
