<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreGallery extends Model
{
    use SoftDeletes;

    protected $table = 'store_galleries';

    protected $fillable = [
        'image_url',
        'merchant_id'
    ];

    protected $dates = ['deleted_at'];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
