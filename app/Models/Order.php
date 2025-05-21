<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Transaction
{
    protected $table = 'transactions';

    public function transactionItems(): HasMany
    {
        return $this->hasMany(TransactionItem::class, 'transaction_id');
    }
}
