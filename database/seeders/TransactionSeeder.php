<?php

namespace Database\Seeders;

use App\Enums\OrderLocationEnum;
use App\Enums\OrderTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $subTotal = 50000; // Contoh subtotal tetap
        $appServiceFee = 2000;
        $couponDiscount = 10000;
        $deliveryFee = 0;

        $finalTotal = $subTotal + $appServiceFee - $couponDiscount;

        for ($day = 1; $day <= 30; $day++) {
            for ($i = 0; $i < 5; $i++) {
                $paymentMethod = $i % 2 === 0 ? PaymentMethodEnum::CASH : PaymentMethodEnum::CASHLESS;

                Transaction::create([
                    'transaction_code' => 'TRSC-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6)),
                    'customer_id' => 6,
                    'merchant_id' => 2,
                    'order_type' => OrderTypeEnum::DINEIN,
                    'order_location' => OrderLocationEnum::ON_PREMISE,
                    'payment_method' => $paymentMethod,
                    'payment_status' => PaymentStatusEnum::PAID,
                    'cash_received_amount' => $paymentMethod === PaymentMethodEnum::CASH ? 60000 : 0,
                    'change_amount' => $paymentMethod === PaymentMethodEnum::CASH ? 60000 - $finalTotal : 0,
                    'dine_in_table_id' => 1,
                    'dine_in_table_label' => '1A',
                    'orderer_name' => 'Thomas Alberto',
                    'orderer_phone_number' => '08225678902',
                    'coupon_id' => 3,
                    'coupon_code' => '16ODKK',
                    'coupon_type' => 'fixed',
                    'coupon_discount' => $couponDiscount,
                    'note' => null,
                    'subtotal_transaction_item' => $subTotal,
                    'delivery_fee' => $deliveryFee,
                    'application_service_fee' => $appServiceFee,
                    'discount_total' => $couponDiscount,
                    'final_total' => $finalTotal,
                    'checked_out_at' => Carbon::create(2025, 5, $day)->addHours($i + 12),
                ]);
            }
        }
    }
}
