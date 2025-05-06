<?php

namespace App\Models;

use App\Enums\PayoutStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Merchant extends Model
{
    use SoftDeletes;

    protected $table = 'merchants';

    protected $fillable = ['user_id', 'id_card_photo', 'business_address', 'business_details', 'tax_identification_number', 'bank_account_number', 'bank_account_name', 'bank_code', 'bank_name', 'bank_passbook_photo', 'payout_status', 'payout_verified_at'];

    protected $dates = ['deleted_at'];

    protected $casts = [
        'payout_status' => PayoutStatusEnum::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessCategory(): BelongsTo
    {
        return $this->belongsTo(BusinessCategory::class);
    }
}
