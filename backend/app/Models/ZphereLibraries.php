<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ZphereLibraries extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'title',
        'thumbnail',
        'genre',
        'synopsis',
        'description',
        'content',  
    ];

    public function user () : BelongsTo 
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
