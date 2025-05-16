<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Table extends Model
{
    protected $table = 'tables';

    protected $fillable = [
        'merchant_id',
        'name',
        'capacity',
        'is_available'
    ];

    protected $casts = [
        'is_available' => 'boolean'
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
