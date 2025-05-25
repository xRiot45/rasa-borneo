<?php

namespace App\Models;

use App\Enums\WithdrawStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Withdraw extends Model
{
    protected $table = 'withdraws';

    protected $fillable = [
        'merchant_id',
        'withdraw_code',
        'amount',
        'bank_code',
        'bank_account_number',
        'bank_account_name',
        'status',
        'note',
        'requested_at',
        'approved_at',
        'rejected_at',
        'canceled_at',
        'transferred_at',
    ];

    protected $casts = [
        'status' => WithdrawStatusEnum::class,
        'requested_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'canceled_at' => 'datetime',
        'transferred_at' => 'datetime',
    ];

    public function merchants(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
