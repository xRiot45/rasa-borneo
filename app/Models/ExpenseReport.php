<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExpenseReport extends Model
{
    protected $table = 'expense_reports';

    protected $fillable = [
        'merchant_id',
        'report_date',
        'description',
        'total_expense',
    ];

    protected $casts = [
        'report_date' => 'date:Y-m-d'
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }

    public function expenseReportItems(): HasMany
    {
        return $this->hasMany(ExpenseReportItem::class);
    }
}
