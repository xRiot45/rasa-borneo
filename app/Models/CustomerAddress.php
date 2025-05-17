<?php

namespace App\Models;

use App\Enums\AddressLabelEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerAddress extends Model
{
    use SoftDeletes;

    protected $table = 'customer_addresses';

    protected $fillable = [
        'customer_id',
        'address_label',
        'complete_address',
        'note_to_courier',
        'recipient_name',
        'email',
        'phone_number',
        'is_primary',
    ];

    protected $cast = [
        'address_label' => AddressLabelEnum::class,
        'is_primary' => 'boolean',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
