<?php

namespace App\Models;

use App\Enums\CourierAssignmentStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourierAssigment extends Model
{
    protected $table = 'courier_assigments';

    protected $fillable = [
        'courier_id',
        'transaction_id',
        'status',
        'accepted_at',
        'rejected_at',
        'delivered_at',
    ];

    protected $casts = [
        'status' => CourierAssignmentStatusEnum::class,
        'accepted_at' => 'datetime',
        'rejected_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }

    public function courier(): BelongsTo
    {
        return $this->belongsTo(Courier::class);
    }
}
