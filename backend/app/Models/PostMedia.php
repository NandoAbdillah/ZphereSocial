<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class PostMedia extends Model
{
    use HasFactory;
    protected $fillable=[
        "post_id",
        "file_type",
        "file",
        "position",
    ];

     
    public function user() : BelongsTo 
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
