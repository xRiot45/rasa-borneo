<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpenseReportItem extends Model
{
    protected $table = 'expense_report_items';

    protected $fillable = [
        'expense_report_id',
        'name',
        'description',
        'amount',
    ];

    public function expenseReport(): BelongsTo
    {
        return $this->belongsTo(ExpenseReport::class);
    }
}
