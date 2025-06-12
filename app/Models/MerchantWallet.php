<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MerchantWallet extends Model
{
    protected $table = 'merchant_wallets';

    protected $fillable = [
        'merchant_id',
        'balance',
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
