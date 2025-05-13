<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class MenuCategory extends Model
{
    use SoftDeletes;

    protected $table = 'menu_categories';

    // Fillable merupakan atribut yang dapat diisi secara manual
    protected $fillable = [
        'name',
        'slug',
        'merchant_id',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->name);

            $model->slug = $model->slug . '-' . $model->merchant_id;

            $count = MenuCategory::where('slug', $model->slug)->count();
            if ($count > 0) {
                $model->slug = $model->slug . '-' . ($count + 1);
            }
        });
    }


    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }

    public function menuItems(): HasMany
    {
        return $this->hasMany(MenuItem::class);
    }
}
