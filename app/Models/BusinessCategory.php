<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessCategory extends Model
{
    use SoftDeletes;

    protected $table = 'business_categories';

    protected $fillable = [
        'name'
    ];

    protected $dates = ['deleted_at'];

    public function merchants(): HasMany
    {
        return $this->hasMany(Merchant::class);
    }
}
