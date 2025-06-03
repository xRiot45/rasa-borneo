<?php

namespace App\Models;

use App\Enums\CourierAssignmentStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourierAssignment extends Model
{
    protected $table = 'courier_assignments';

    protected $fillable = [
        'courier_id',
        'transaction_id',
        'status',
        'accepted_at',
        'delivered_at',
        'completed_at',
        'proof_of_delivery'
    ];

    protected $casts = [
        'status' => CourierAssignmentStatusEnum::class,
        'accepted_at' => 'datetime',
        'delivered_at' => 'datetime',
        'completed_at' => 'datetime',
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
