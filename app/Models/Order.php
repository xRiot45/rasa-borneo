<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Transaction
{
    protected $table = 'transactions';

    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class, 'transaction_id');
    }

    public function orderStatus(): HasMany
    {
        return $this->hasMany(OrderStatus::class, 'transaction_id', 'id');
    }
}
