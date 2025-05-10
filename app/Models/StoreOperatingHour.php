<?php

namespace App\Models;

use App\Enums\DayEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreOperatingHour extends Model
{
    protected $table = 'store_operating_hours';

    protected $fillable = [
        'merchant_id',
        'day_of_week',
        'open_time',
        'close_time',
        'is_closed'
    ];

    protected $casts = [
        'day_of_week' => DayEnum::class,
        'open_time' => 'datetime:H:i:s',
        'close_time' => 'datetime:H:i:s',
        'is_closed' => 'boolean'
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
