<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RouteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $stopsCount = ($this->places_count ?? 0) +
            ($this->restaurants_count ?? 0) +
            ($this->hotels_count ?? 0) +
            ($this->events_count ?? 0);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'time' => $this->time,
            'description' => $this->description,
            'image_url' => $this->whenLoaded('image', fn() => $this->image ? asset($this->image->url) : 'https://placehold.co/600x400/2E6230/FFFFFF?text=Ruta'),
            'stops_count' => $stopsCount, // El total de paradas calculado

            // Opcional: Podrías incluir las paradas si las cargas con 'load'
            // 'places' => PlaceResource::collection($this->whenLoaded('places')),
            // 'restaurants' => RestaurantResource::collection($this->whenLoaded('restaurants')),
        ];
    }
}
