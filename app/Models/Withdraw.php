<?php

namespace App\Models;

use App\Enums\WithdrawStatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

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
        'transfer_proof',
    ];

    protected $casts = [
        'status' => WithdrawStatusEnum::class,
        'requested_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'canceled_at' => 'datetime',
        'transferred_at' => 'datetime',
    ];

    public static function boot(): void
    {
        parent::boot();

        static::creating(function ($withdraw) {
            $randomString = strtoupper(Str::random(6));
            $withdraw->withdraw_code = 'WD-' . now()->format('Ymd') . '-' . $randomString;

            if (empty($withdraw->requested_at)) {
                $withdraw->requested_at = Carbon::now();
            }
        });
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
