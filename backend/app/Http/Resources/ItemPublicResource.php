<?php
namespace App\Http\Resources;

use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Http\Resources\UserPublicResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemPublicResource extends JsonResource
{

            // return  PurchaseResource::collection($incomingOrders);
    public function toArray(Request $request):array
    {
        $incomingOrders = Purchase::where('item_id', $this->id)
        ->whereNotIn('status', ['rejected_by_owner', 'canceled_by_user', 'order_completed'])->get();

        return [
            "id"=> $this->id,
            "user_id" => $this->user_id,
            "user_detail" => new UserPublicResource($this->whenLoaded('user')),
            "incoming_order" => sizeof($incomingOrders),
            "item" => $this->item,
            "category" => $this->category,
            "price" => $this->price,
            "stock" => $this->stock,
            "description" => $this->description,
            "reviews" => $this->reviews,
            "stars" =>$this->stars,
            "available" => $this->available,
            "deleted" => $this->deleted,
            "picture" => $this->picture,
            "sold" => $this->sold,
        ];
    }
}