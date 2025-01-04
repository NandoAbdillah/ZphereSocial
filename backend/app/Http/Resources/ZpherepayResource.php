<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZpherepayResource extends JsonResource
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
            'uuid' => $this->uuid,
            'user_detail' => new UserPublicResource($this->whenLoaded('user')),
            'saldo' => $this->saldo,
            'level' => $this->level,
            'telp' => $this->telp,
            'status' => $this->status,
            'verified_at' => $this->verified_at,
        ];
    }
}
