<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;
    protected $fillable=[
        "type",
        "user_id",
        "message",
        "context",
        "receiver_id",
        "url",
        "read_at",
    ];

    
    public function user() : BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
