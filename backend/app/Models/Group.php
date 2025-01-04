<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Group extends Model
{
    use HasFactory;
    protected $fillable=[
        "uuid",
        "user_id",
        "icon",
        "thumbnail",
        "description",
        "name",
        "location",
        "type",
        "members",
        "is_private",
    ];

     
    public function user() : BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class)->where('is_group_post', true);
    }
}
