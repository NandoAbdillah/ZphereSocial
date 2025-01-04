<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
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


    public function page() : BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    
    public function post() : hasMany
    {
        return $this->hanHany(Post::class);
    }
}
