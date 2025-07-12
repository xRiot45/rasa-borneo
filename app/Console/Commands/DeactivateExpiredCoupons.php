<?php

namespace App\Console\Commands;

use App\Models\Coupon;
use Illuminate\Console\Command;

class DeactivateExpiredCoupons extends Command
{
    protected $signature = 'app:deactivate-expired-coupons';

    protected $description = 'Deactivate expired coupons';


    public function handle()
    {
        Coupon::where('is_active', true)
            ->where('end_date', '<', now())
            ->update(['is_active' => false]);

        $this->info('Expired coupons deactivated.');
    }
}
