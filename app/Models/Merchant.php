<?php

namespace App\Models;

use App\Enums\PayoutStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Merchant extends Model
{
    use SoftDeletes;

    protected $table = 'merchants';

    protected $fillable = [
        // Informasi Pribadi
        'user_id',
        'id_card_photo',

        // Informasi Bisnis
        'business_name',
        'business_phone',
        'business_email',
        'postal_code',
        'business_description',
        'business_address',
        'business_category_id',

        // Informasi Rekening Bank
        'bank_code',
        'bank_account_number',
        'bank_account_name',

        // Informasi Perpajakan
        'tax_identification_number',

        // Informasi Verifikasi
        'is_verified',
    ];

    protected $dates = ['deleted_at'];

    protected $casts = [
        'payout_status' => PayoutStatusEnum::class,
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model): void {
            $model->slug = Str::slug($model->business_name);
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function businessCategory(): BelongsTo
    {
        return $this->belongsTo(BusinessCategory::class);
    }

    // RELASI ONE-TO-MANY DENGAN MENU_CATEGORY
    public function menuCategories(): HasMany
    {
        return $this->hasMany(MenuCategory::class);
    }

    // RELASI ONE-TO-MANY DENGAN MENU_ITEM
    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }

    // RELASI ONE-TO-ONE DENGAN STORE_PROFILE
    public function storeProfile(): HasOne
    {
        return $this->hasOne(StoreProfile::class);
    }

    // RELASI ONE-TO-MANY DENGAN STORE_GALLERY
    public function storeGalleries(): HasMany
    {
        return $this->hasMany(StoreGallery::class);
    }

    // RELASI ONE-TO-MANY DENGAN STORE_OPERATING_HOUR
    public function storeOperatingHours(): HasMany
    {
        return $this->hasMany(StoreOperatingHour::class);
    }

    // RELASI ONE-TO-MANY DENGAN CART
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    // RELASI ONE-TO-MANY DENGAN COUPON
    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class);
    }
}
