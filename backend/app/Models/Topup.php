<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topup extends Model
{
    use HasFactory;

    protected $fillable =
    [
        'uuid',
        'account_id',
        'user_token',
        'agen',
        'agen_token',
        'cash',
        'balance',
        'status',
        'created_at',
        'updated_at',
    ];
}
