<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HomeEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->loadMissing(['image', 'subevent.image', 'subevent.tags']);

        $startDate = $this->starts_at->translatedFormat('j');
        $endDate = $this->finishes_at->translatedFormat('j \d\e F \d\e Y');
        $dateRange = "Del $startDate al $endDate";

        return [
            'eventName' => $this->name,
            'eventDateRange' => $dateRange,
            'eventDescription' => $this->description,
            'eventImage' => $this->image ? asset($this->image->url) : 'https://placehold.co/1200x600',
            'subEvents' => HomeSubeventResource::collection($this->subevent),
        ];
    }
}
