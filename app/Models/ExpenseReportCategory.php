<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseReportCategory extends Model
{
    protected $table = 'expense_report_categories';

    protected $fillable = [
        'merchant_id',
        'name',
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
