<?php

namespace App\Models;

use App\Enums\CouponTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coupon extends Model
{
    protected $table = 'coupons';

    protected $fillable = [
        'merchant_id',
        'code',
        'type',
        'discount',
        'minimum_purchase',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'type' => CouponTypeEnum::class,
        'is_active' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
