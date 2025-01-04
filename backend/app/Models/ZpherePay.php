<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ZpherePay extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'telp',
        'saldo',
        'verified_at',
        'pin',
        'status',
        'level',
    ];

    protected $hidden = [
        'pin',
    ];
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }
    
}
