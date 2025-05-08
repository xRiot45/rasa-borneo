<?php

namespace App\Models;

use App\Enums\MenuItemStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class MenuItem extends Model
{

    use SoftDeletes;

    protected $table = 'menu_items';

    protected $fillable = [
        'name',
        'price',
        'image_url',
        'status',
        'short_description',
        'menu_category_id',
        'merchant_id',
        'is_recommended',
    ];

    protected $dates = ['deleted_at'];

    protected $cast = [
        'status' => MenuItemStatusEnum::class,
        'image_url' => 'array',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->name);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function menuCategory(): BelongsTo
    {
        return $this->belongsTo(MenuCategory::class);
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
