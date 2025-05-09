<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreProfile extends Model
{
    protected $table = 'store_profiles';

    protected $fillable = [
        // Photos
        'logo_photo',
        'cover_photo',

        // Media Social URL
        'website_url',
        'instagram_url',
        'facebook_url',
        'twitter_url',
        'tiktok_url',
        'whatsapp_url',

        // Store Location
        'latitude',
        'longitude',

        // Store Information
        'founded_year',
        'number_of_employees',
        'merchant_id',
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
