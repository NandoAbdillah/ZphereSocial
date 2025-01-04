<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopItem extends Model
{
    use HasFactory;

    protected $fillable=[
        "user_id",
        "item",
        "picture",
        "stock",
        "price",
        "description",
        "category",
        "sold",
        "reviews",
        "stars"
    ];

    
    public function user() : \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
