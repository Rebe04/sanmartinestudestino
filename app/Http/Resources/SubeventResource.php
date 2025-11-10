<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubeventResource extends JsonResource
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
            'description' => $this->description,
            'date' => $this->date->format('Y-m-d'),
            'duration' => $this->duration,
            'event_id' => $this->event_id,
            'image_url' => $this->whenLoaded('image', fn() => $this->image ? asset($this->image->url) : 'https://placehold.co/400x400/eeeeee/cccccc?text=Subevento'),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
        ];
    }
}
