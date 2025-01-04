<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchasePublicResource extends JsonResource
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
            'item_id' => $this->item_id,
            'owner_id' => $this->owner_id,
            'item_detail' => new ItemPublicResource($this->whenLoaded('item')),
            'status' => $this->status,
            
        ];
    }
}
