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
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class TransactionController extends Controller
{
    private function handleMidtransStatusUpdate(Transaction $transaction, string $transactionStatus): void
    {
        $paymentStatusMap = [
            'capture' => PaymentStatusEnum::PAID,
            'settlement' => PaymentStatusEnum::PAID,
            'pending' => PaymentStatusEnum::PENDING,
            'deny' => PaymentStatusEnum::FAILED,
            'cancel' => PaymentStatusEnum::CANCELLED,
            'failure' => PaymentStatusEnum::FAILED,
        ];

        $transaction->payment_status = $paymentStatusMap[$transactionStatus] ?? $transaction->payment_status;
        $transaction->payment_method = PaymentMethodEnum::CASHLESS;
        $transaction->save();
    }

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
                    'coupon_type' => $coupon->type->value,
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
                    'orderer_name' => $request->orderer_name,
                    'orderer_phone_number' => $request->orderer_phone_number,
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

    public function payWithMidtrans(Request $request, string $transactionCode): RedirectResponse
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

        $transaction->load('transactionItems');

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
                    'coupon_type' => $coupon->type->value,
                    'coupon_discount' => $coupon->discount,
                ];
            }
        }

        // 8. Snapshot alamat jika delivery
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

        // 9. Snapshot dine-in table
        $dineInSnapshot = [];
        if ($orderType === OrderTypeEnum::DINEIN) {
            $dineInTable = Table::find($request->dine_in_table_id);
            if ($dineInTable) {
                $dineInSnapshot = [
                    'dine_in_table_id' => $dineInTable->id,
                    'dine_in_table_label' => $dineInTable->name,
                ];
            }
        }

        // 10. Hitung final total
        $finalTotal = $subtotalTransactionItems + $deliveryFee + $applicationServiceFee - $discountTotal;

        // 11. Buat item detail untuk midtrans
        $itemDetails = $transaction->transactionItems
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->menu_item_name,
                    'price' => $item->menu_item_price,
                    'quantity' => $item->quantity,
                ];
            })
            ->toArray();

        if ($orderType === OrderTypeEnum::DELIVERY && $deliveryFee > 0) {
            $itemDetails[] = [
                'id' => 'delivery_fee',
                'name' => 'Biaya Pengiriman',
                'price' => $deliveryFee,
                'quantity' => 1,
            ];
        }

        if ($applicationServiceFee > 0) {
            $itemDetails[] = [
                'id' => 'application_service_fee',
                'name' => 'Biaya Layanan Aplikasi',
                'price' => $applicationServiceFee,
                'quantity' => 1,
            ];
        }

        if ($discountTotal > 0) {
            $itemDetails[] = [
                'id' => 'discount_total',
                'name' => 'Diskon',
                'price' => $discountTotal,
                'quantity' => 1,
            ];
        }

        // 12. Konfigurasi Midtrans
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = config('services.midtrans.is_sanitized');
        \Midtrans\Config::$is3ds = config('services.midtrans.is_3ds');

        // 13. Buat Data untuk parameter midtrans
        $customerDetails = [
            'first_name' => $user->full_name,
            'phone' => $user->phone_number,
            'email' => $user->email,
        ];

        if ($orderType === OrderTypeEnum::DELIVERY && $customerAddress) {
            $customerDetails['shipping_address'] = [
                'first_name' => $customerAddress->recipient_name,
                'phone' => $customerAddress->recipient_phone_number,
                'email' => $customerAddress->recipient_email,
                'address' => $customerAddress->complete_address,
            ];
        }

        // 14. Parameter Midtrans
        $midtransParams = [
            'transaction_details' => [
                'order_id' => $transaction->transaction_code,
                'gross_amount' => $finalTotal,
            ],
            'customer_details' => $customerDetails,
            'item_details' => $itemDetails,
            'callbacks' => [
                'finish' => route('transaction.success'),
                'unfinish' => route('transaction.pending'),
                'error' => route('transaction.failed'),
            ],
            'notification_url' => route('midtrans.notification'),
        ];

        // 15. Ambil Snap Token
        $snapToken = \Midtrans\Snap::getSnapToken($midtransParams);

        // 16. Update transaksi
        $transaction->update(
            array_merge(
                [
                    'order_type' => $orderType,
                    'order_location' => $request->order_location,
                    'payment_method' => $paymentMethod,
                    'delivery_fee' => $deliveryFee,
                    'application_service_fee' => $applicationServiceFee,
                    'discount_total' => $discountTotal,
                    'orderer_name' => $request->orderer_name,
                    'orderer_phone_number' => $request->orderer_phone_number,
                    'note' => $request->note,
                    'final_total' => $finalTotal,
                    'checked_out_at' => now(),
                ],
                $customerAddressSnapshot,
                $dineInSnapshot,
                $couponSnapshot,
            ),
        );

        // 17. Kembalikan ke halaman sebelumnya dan berikan snap token
        return redirect()
            ->back()
            ->with(['snap_token' => $snapToken]);
    }

    public function midtransNotification(Request $request): mixed
    {
        // 1. Validasi Signature Key
        $serverKey = config('services.midtrans.server_key');
        $hashed = hash('sha512', $request['order_id'] . $request['status_code'] . $request['gross_amount'] . $serverKey);

        if ($hashed !== $request['signature_key']) {
            return response()->json(['message' => 'Invalid Signature Key'], 403);
        }

        // 2. Ambil transaksi berdasarkan kode
        $transaction = Transaction::where('transaction_code', $request['order_id'])->first();

        // 3. Cek jika tidak ditemukan
        if (!$transaction) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        // 4. Ambil status dan reference dari Midtrans
        $transactionStatus = $request['transaction_status'];
        $paymentReference = $request['transaction_id'] ?? null;

        // 5. Update berdasarkan status Midtrans
        if (in_array($transactionStatus, ['settlement', 'capture']) && $transaction->payment_status !== PaymentStatusEnum::PAID) {
            $transaction->update([
                'payment_status' => PaymentStatusEnum::PAID,
                'payment_reference' => $paymentReference,
                'checked_out_at' => now(),
            ]);
        } elseif (in_array($transactionStatus, ['cancel', 'expire', 'deny'])) {
            $transaction->update([
                'payment_status' => PaymentStatusEnum::FAILED,
                'payment_reference' => $paymentReference,
            ]);
        }

        return response()->json(['message' => 'Notifikasi berhasil diproses'], 200);
    }


    public function transactionSuccess(): InertiaResponse
    {
        return Inertia::render('customer/pages/transaction/success', [
            'message' => 'Pembayaran berhasil! Terima kasih telah memesan.',
        ]);
    }

    public function transactionPending(): InertiaResponse
    {
        return Inertia::render('customer/pages/transaction/pending', [
            'message' => 'Pembayaran pending.',
        ]);
    }

    public function transactionFailed(): InertiaResponse
    {
        return Inertia::render('customer/pages/transaction/failed', [
            'message' => 'Pembayaran gagal. Silakan coba lagi atau hubungi kasir.',
        ]);
    }
}
