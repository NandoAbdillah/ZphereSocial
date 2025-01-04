<?php

namespace App\Http\Resources;

use App\Models\GroupMember;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostGroupResource extends JsonResource
{
   
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'name' => $this->name,

        ];
    }
}