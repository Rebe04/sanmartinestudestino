<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class HomeSubeventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->loadMissing(['image', 'tags']);
        return [
            'image' => $this->image ? asset($this->image->url) : 'https://placehold.co/400x400',
            'name' => $this->name,
            'extract' => Str::limit($this->description, 150),
            'date' => $this->date->translatedFormat('l, j \d\e F'),
            'time' => $this->duration,
            'location' => 'Por definir', // Placeholder
            'category' => $this->tags->first()->name ?? 'General',
            'long_description' => $this->description,
        ];
    }
}
