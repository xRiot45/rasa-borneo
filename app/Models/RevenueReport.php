<?php

namespace App\Models;

use App\Enums\ReportTypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RevenueReport extends Model
{
    protected $table = 'revenue_reports';

    protected $fillable = [
        'merchant_id',
        'report_date',
        'report_type',
        'total_order',
        'total_transaction',
        'total_revenue',
        'total_cost',
        'total_profit',
    ];

    protected $casts = [
        'report_date' => 'date',
        'report_type' => ReportTypeEnum::class
    ];

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class);
    }
}
