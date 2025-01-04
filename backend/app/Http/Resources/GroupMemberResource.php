<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupMemberResource extends JsonResource
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
            "group_id" => $this->group_id,
            "user_id" => $this->user_id,
            "user_detail" => new MembersGroupResource($this->whenLoaded('user')),
            
        ];
    }
}
