<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
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
            'order_name' => $this->order_name,
            'user_id' => $this->user_id,
            'item_id' => $this->item_id,
            'owner_id' => $this->owner_id,
            'item_detail' => new ItemPublicResource($this->whenLoaded('item')),
            'user_detail' => new UserPublicResource($this->whenLoaded('user')),
            'subtotal' => $this->subtotal,
            'shipping' => $this->shipping,
            'total_pays' => $this->total_pays,
            'payment' => $this->payment,
            'total_item' => $this->total_item,
            'specific_location' => $this->specific_location,
            'created_at' => $this->created_at,
            'messages' => $this->messages,
            'description' => $this->description,
            'status' => $this->status,
            'arrived_confirmed' => $this->arrived_confirmed,
            
        ];
    }
}
