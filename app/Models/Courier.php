<?php

namespace App\Models;

use App\Enums\GenderEnum;
use App\Enums\VehicleTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Courier extends Model
{
    protected $table = 'couriers';

    protected $fillable = [
        'user_id',
        'vehicle_type',
        'national_id',
        'id_card_photo',
        'age',
        'birthplace',
        'birthdate',
        'profile_image',
        'gender',
        'driving_license_photo',
        'is_online',
        'is_verified',
    ];

    protected $casts = [
        'vehicle_type' => VehicleTypeEnum::class,
        'gender' => GenderEnum::class,
        'birthdate' => 'date:Y-m-d',
        'is_online' => 'boolean',
        'is_verified' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
