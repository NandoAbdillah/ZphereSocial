<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            "user_id" => $this->user_id,
            "story" => $this->story,
            "status" => $this->status,
            "caption" => $this->caption,
            "likes" => $this->likes,
            "comment" => $this->comment,
            'user' => new UserStoryResource($this->whenLoaded('user'))

        ];
    }
}
