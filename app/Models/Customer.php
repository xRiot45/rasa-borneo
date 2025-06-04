<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $table = 'customers';

    protected $fillable = [
        'user_id',
        'birthplace',
        'birthdate',
        'profile_image',
        'gender',
    ];

    protected function casts(): array
    {
        return [
            'birthdate' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function customerAddresses(): HasMany
    {
        return $this->hasMany(CustomerAddress::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function merchantReviews(): HasMany
    {
        return $this->hasMany(MerchantReview::class);
    }

    public function menuItemReviews(): HasMany
    {
        return $this->hasMany(MenuItemReview::class);
    }
}
