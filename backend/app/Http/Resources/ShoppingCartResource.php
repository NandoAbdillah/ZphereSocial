<?php

namespace App\Http\Resources;

use App\Models\ShopItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShoppingCartResource extends JsonResource
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
            "user_id" => $this->user_id,
            "item_id" => $this->item_id,
            "items" => $this->items,
            "item_detail" => new ItemPublicResource($this->whenLoaded('item')),
            "created_at"=> $this->created_at
        ];
    }
}
