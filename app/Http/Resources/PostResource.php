<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 1. Campos que quieres pasar tal cual
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'extract' => $this->extract,
            'content' => $this->content,
            'status' => $this->status,
            'created_at_formatted' => $this->created_at->translatedFormat('d M Y'),
            'created_at' => $this->created_at,
            'image' => new ImageResource($this->whenLoaded('image')),
            'user' => new UserResource($this->whenLoaded('user')),
            'category' => new PostCategoryResource($this->whenLoaded('postCategory')),
        ];
    }
}
