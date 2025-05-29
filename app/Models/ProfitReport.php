<?php

namespace App\Models;

use App\Enums\ReportTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfitReport extends Model
{
    protected $table = 'profit_reports';

    protected $fillable = [
        'merchant_id',
        'start_date',
        'end_date',
        'report_type',
        'total_revenue',
        'total_expense',
        'gross_profit',
        'net_profit',
    ];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
        'report_type' => ReportTypeEnum::class,
        'total_revenue' => 'integer',
        'total_expense' => 'integer',
        'gross_profit' => 'integer',
        'net_profit' => 'integer',
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
