<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BooksResource extends JsonResource
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
            'user_id' => $this->user_id,
            'user_detail' => new UserPublicResource($this->whenLoaded('user')),
            'title' => $this->title,
            'thumbnail' => $this->thumbnail, 
            'synopsis' => $this->synopsis,
            'description' => $this->description,
            'content' => $this->content,
            'genre' => $this->genre,
            'views' => $this->views,
            'likes'  => $this->likes,
            'created_at' => $this->created_at,
        ];
    }
}
