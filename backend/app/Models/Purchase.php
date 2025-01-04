<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Purchase extends Model
{
    use HasFactory;

    use HasFactory;
    protected $fillable=[
        "owner_id",
        "user_id",
        "item_id",
        "order_name",
        "total_item",
        "description",
        "messages",
        "payment",
        "subtotal",
        "shipping",
        "total_pays",
        "status",
        "order_total",
        "specific_location",
        "postal_code",
        "review",
        "arrived_confirmed",

    ];

     
    public function user() : BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function item() : BelongsTo
    {
        return $this->belongsTo(ShopItem::class, 'item_id');
    }
}
