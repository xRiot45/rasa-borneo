<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourierWalletHistory extends Model
{
    protected $table = 'courier_wallet_histories';

    protected $fillable = [
        'courier_id',
        'transaction_id',
        'amount',
        'earned_at',
    ];

    protected $casts = [
        'earned_at' => 'datetime',
    ];

    public function courier(): BelongsTo
    {
        return $this->belongsTo(Courier::class);
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
