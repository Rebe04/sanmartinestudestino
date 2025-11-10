<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
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
            'description' => $this->description,
            'starts_at' => $this->starts_at->format('Y-m-d'),
            'finishes_at' => $this->finishes_at->format('Y-m-d'),
            'image_url' => $this->whenLoaded('image', fn() => $this->image ? asset($this->image->url) : 'https://placehold.co/800x400/2E6230/FFFFFF?text=Evento'),
            'event_category' => new EventCategoryResource($this->whenLoaded('eventCategory')),
            'subevents' => SubeventResource::collection($this->whenLoaded('subevent')),
        ];
    }
}
