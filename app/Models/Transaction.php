<?php

namespace App\Models;

use App\Enums\OrderLocationEnum;
use App\Enums\OrderTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'transaction_code',

        //   -- Relasi ke tabel lainnya
        'customer_id',
        'merchant_id',

        //   -- Informasi Tipe Order & Lokasi Order
        'order_type',
        'order_location',

        //   -- Informasi Pembayaran
        'payment_method',
        'payment_status',
        'payment_reference',
        'cash_received_amount',
        'change_amount',

        //   -- Snapshot dari customer_address_id (khusus untuk delivery)
        'customer_address_id',
        'recipient_address_label',
        'recipient_name',
        'recipient_phone_number',
        'recipient_email',
        'recipient_address',
        'delivery_note',

        //   -- Snapshot dari table (khusus dine-in)
        'dine_in_table_id',
        'dine_in_table_label',

        //   -- Informasi customer (khusus dine-in, takeway dan pickup)
        'orderer_name',
        'orderer_phone_number',

        //   -- Snapshot dari coupon_id (Informasi Kupon)
        'coupon_id',
        'coupon_code',
        'coupon_type',
        'coupon_discount',

        //     -- Informasi Tambahan
        'note',

        //   -- Perhitungan Transaksi
        'subtotal_transaction_item',
        'delivery_fee',
        'application_service_fee',
        'discount_total',
        'final_total',

        //   -- Waktu checkout
        'checked_out_at',
    ];

    protected function casts(): array
    {
        return [
            'order_type' => OrderTypeEnum::class,
            'order_location' => OrderLocationEnum::class,
            'payment_method' => PaymentMethodEnum::class,
            'payment_status' => PaymentStatusEnum::class,
            'checked_out_at' => 'datetime',
        ];
    }

    public static function boot(): void
    {
        parent::boot();

        static::creating(function ($transaction) {
            $randomString = strtoupper(Str::random(6));
            $transaction->transaction_code = 'TRSC-' . now()->format('Ymd') . '-' . $randomString;
        });
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function customerAddress(): BelongsTo
    {
        return $this->belongsTo(CustomerAddress::class);
    }

    public function dineInTable(): BelongsTo
    {
        return $this->belongsTo(Table::class);
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }

    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class);
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }

    public function orderStatus(): HasMany
    {
        return $this->hasMany(OrderStatus::class);
    }

    public function latestOrderStatus(): HasOne
    {
        return $this->hasOne(OrderStatus::class, 'transaction_id')->latestOfMany();
    }

    public function courierAssigment(): HasOne
    {
        return $this->hasOne(CourierAssignment::class);
    }

    public function courierAssignmentRejection(): HasOne
    {
        return $this->hasOne(CourierAssignmentRejection::class);
    }

    public function courierWalletHistory(): HasMany
    {
        return $this->hasMany(CourierWalletHistory::class);
    }

    public function menuItemReviews(): HasMany
    {
        return $this->hasMany(MenuItemReview::class);
    }
}
