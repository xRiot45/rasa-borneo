<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourierWallet extends Model
{
    protected $table = 'courier_wallets';

    protected $fillable = [
        'courier_id',
        'balance'
    ];

    public function courier(): BelongsTo
    {
        return $this->belongsTo(Courier::class);
    }
}
