<?php

namespace App\Models;

use App\Enums\GenderEnum;
use App\Enums\VehicleTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Courier extends Model
{
    use SoftDeletes;

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
        'license_plate',
        'is_online',
        'is_verified',
    ];

    protected $casts = [
        'is_online' => 'boolean',
        'vehicle_type' => VehicleTypeEnum::class,
        'gender' => GenderEnum::class,
        'birthdate' => 'date:Y-m-d',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function courierAssigments(): HasMany
    {
        return $this->hasMany(CourierAssignment::class);
    }

    public function courierAssignmentRejections(): HasMany
    {
        return $this->hasMany(CourierAssignmentRejection::class);
    }

    public function courierWallet(): HasOne
    {
        return $this->hasOne(CourierWallet::class);
    }

    public function courierWalletHistories(): HasMany
    {
        return $this->hasMany(CourierWalletHistory::class);
    }

    public function withdraws(): HasMany
    {
        return $this->hasMany(Withdraw::class);
    }
}
