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
        'category_id',
        'description',
        'amount',
    ];

    public function expenseReport(): BelongsTo
    {
        return $this->belongsTo(ExpenseReport::class);
    }

    public function expenseReportCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseReportCategory::class);
    }
}
