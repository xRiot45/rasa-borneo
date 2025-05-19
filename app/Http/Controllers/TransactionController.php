<?php

namespace App\Http\Controllers;

use App\Enums\CouponTypeEnum;
use App\Enums\OrderTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Models\Coupon;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\Fee;
use App\Models\Table;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function payWithCash(Request $request, string $transactionCode): RedirectResponse
    {
        // 1. Autentikasi user dan ambil data customer
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();
        $customerId = $customer->id;

        // 2. Ambil transaksi
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();
        if (!$transaction) {
            return redirect()->back()->withErrors('Transaksi tidak ditemukan.');
        }

        // 3. Ambil alamat customer (jika ada)
        $customerAddress = CustomerAddress::where('customer_id', $customerId)->where('is_primary', true)->first();

        // 4. Ambil biaya (delivery dan application fee)
        $fees = Fee::whereIn(DB::raw('LOWER(type)'), ['delivery_fee', 'application_service_fee'])
            ->get()
            ->keyBy('type');

        // 5. Setup enum
        $orderType = OrderTypeEnum::tryFrom($request->order_type) ?? OrderTypeEnum::DINEIN;
        $paymentMethod = PaymentMethodEnum::tryFrom($request->payment_method) ?? PaymentMethodEnum::CASH;

        // 6. Hitung subtotal dan biaya
        $subtotalTransactionItems = $transaction->subtotal_transaction_item;
        $deliveryFee = $orderType === OrderTypeEnum::DELIVERY ? $fees['delivery_fee']->amount ?? 0 : 0;
        $applicationServiceFee = $fees['application_service_fee']->amount ?? 0;

        // 7. Hitung diskon berdasarkan kupon
        $discountTotal = 0;
        $couponSnapshot = [];

        if ($request->coupon_id) {
            $coupon = Coupon::find($request->coupon_id);

            if ($coupon) {
                if ($coupon->type === CouponTypeEnum::PERCENTAGE) {
                    $discountTotal = ($coupon->discount / 100) * $subtotalTransactionItems;
                } elseif ($coupon->type === CouponTypeEnum::FIXED) {
                    $discountTotal = $coupon->discount;
                }

                $discountTotal = min($discountTotal, $subtotalTransactionItems);

                $couponSnapshot = [
                    'coupon_id' => $coupon->id,
                    'coupon_code' => $coupon->code,
                    'coupon_type' => $coupon->type->value, // simpan string ke DB
                    'coupon_discount' => $coupon->discount,
                ];
            }
        }



        // 8. Hitung final total
        $finalTotal = $subtotalTransactionItems + $deliveryFee + $applicationServiceFee - $discountTotal;

        // 9. Validasi pembayaran tunai
        if ($paymentMethod === PaymentMethodEnum::CASH && $request->cash_received_amount < $finalTotal) {
            return redirect()
                ->back()
                ->withErrors(['cash_received_amount' => 'Uang Anda kurang.']);
        }

        // 10. Status pembayaran
        $paymentStatus = $paymentMethod === PaymentMethodEnum::CASH && $request->cash_received_amount >= $finalTotal ? PaymentStatusEnum::PAID : PaymentStatusEnum::PENDING;

        $cashReceivedAmount = $paymentMethod === PaymentMethodEnum::CASH ? $request->cash_received_amount : null;
        $changeAmount = $cashReceivedAmount !== null ? $cashReceivedAmount - $finalTotal : 0;

        // 11. Snapshot alamat jika delivery
        $customerAddressSnapshot = [];
        if ($orderType === OrderTypeEnum::DELIVERY && $customerAddress) {
            $customerAddressSnapshot = [
                'customer_address_id' => $customerAddress->id,
                'recipient_address_label' => $customerAddress->address_label,
                'recipient_name' => $customerAddress->recipient_name,
                'recipient_phone_number' => $customerAddress->phone_number,
                'recipient_email' => $customerAddress->email,
                'recipient_address' => $customerAddress->complete_address,
                'delivery_note' => $customerAddress->note_to_courier,
            ];
        }

        // 12. Snapshot dine-in table
        $dineInSnapshot = [];
        if ($orderType === OrderTypeEnum::DINEIN) {
            $dineInTable = Table::find($request->dine_in_table_id);
            if ($dineInTable) {
                $dineInSnapshot = [
                    'dine_in_table_id' => $dineInTable->id,
                    'dine_in_table_label' => $dineInTable->name,
                    'orderer_name' => $request->orderer_name,
                    'orderer_phone_number' => $request->orderer_phone_number,
                ];
            }
        }

        // 13. Update transaksi
        $transaction->update(
            array_merge(
                [
                    'order_type' => $orderType,
                    'order_location' => $request->order_location,
                    'payment_method' => $paymentMethod,
                    'payment_status' => $paymentStatus,
                    'cash_received_amount' => $cashReceivedAmount,
                    'change_amount' => $changeAmount,
                    'delivery_fee' => $deliveryFee,
                    'application_service_fee' => $applicationServiceFee,
                    'discount_total' => $discountTotal,
                    'note' => $request->note,
                    'final_total' => $finalTotal,
                    'checked_out_at' => now(),
                ],
                $customerAddressSnapshot,
                $dineInSnapshot,
                $couponSnapshot,
            ),
        );

        return redirect()->route('home')->with('success', 'Transaksi berhasil diperbarui.');
    }
}
