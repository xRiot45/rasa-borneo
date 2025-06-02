<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourierRejection extends Model
{
    protected $table = 'courier_rejections';

    protected $fillable = ['courier_id', 'transaction_id', 'rejected_at'];

    protected $casts = [
        'rejected_at' => 'datetime',
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
