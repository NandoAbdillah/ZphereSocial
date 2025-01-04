<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "post_id" => $this->post_id,
            "user_id" => $this->user_id,
            "comment" => $this->comment,
            "status" => $this->status,
            "user" => new UserResource($this->whenLoaded('user')),
            "created_at" => $this->created_at

        ];
    }
}
