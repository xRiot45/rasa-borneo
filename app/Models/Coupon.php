<?php

namespace App\Models;

use App\Enums\CouponTypeEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
    use SoftDeletes;

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

    public function setStartDateAttribute($value)
    {
        $this->attributes['start_date'] = Carbon::parse($value)->setTime(23, 0, 0);
    }

    public function setEndDateAttribute($value)
    {
        $this->attributes['end_date'] = Carbon::parse($value)->setTime(23, 0, 0);
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
