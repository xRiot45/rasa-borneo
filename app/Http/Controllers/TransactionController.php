<?php

namespace App\Http\Controllers;

use App\Enums\CouponTypeEnum;
use App\Enums\OrderStatusEnum;
use App\Enums\OrderTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use App\Http\Requests\TransactionRequest;
use App\Models\Coupon;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\Fee;
use App\Models\OrderStatus;
use App\Models\Table;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Midtrans\Config;
use Midtrans\Snap;

class TransactionController extends Controller
{
    private function getTransaction(string $transactionCode): Transaction
    {
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();
        if (!$transaction) {
            abort(404, 'Transaksi tidak ditemukan.');
        }
        return $transaction;
    }

    private function getFees(): Collection
    {
        return Fee::whereIn(DB::raw('LOWER(type)'), ['delivery_fee', 'application_service_fee'])
            ->get()
            ->keyBy('type');
    }

    private function calculateDeliveryFee(OrderTypeEnum $orderType, $fees): int
    {
        return $orderType === OrderTypeEnum::DELIVERY ? $fees['delivery_fee']->amount ?? 0 : 0;
    }

    private function calculateDiscount(?int $couponId, float $subtotal): array
    {
        $discountTotal = 0;
        $couponSnapshot = [];

        if ($couponId) {
            $coupon = Coupon::find($couponId);
            if ($coupon) {
                if ($coupon->type === CouponTypeEnum::PERCENTAGE) {
                    $discountTotal = ($coupon->discount / 100) * $subtotal;
                } elseif ($coupon->type === CouponTypeEnum::FIXED) {
                    $discountTotal = $coupon->discount;
                }

                $discountTotal = min($discountTotal, $subtotal);

                $couponSnapshot = [
                    'coupon_id' => $coupon->id,
                    'coupon_code' => $coupon->code,
                    'coupon_type' => $coupon->type->value,
                    'coupon_discount' => $coupon->discount,
                ];
            }
        }

        return [$discountTotal, $couponSnapshot];
    }

    private function getPaymentStatus(PaymentMethodEnum $method, ?float $cashReceived, float $finalTotal): PaymentStatusEnum
    {
        if ($method === PaymentMethodEnum::CASH && $cashReceived >= $finalTotal) {
            return PaymentStatusEnum::PAID;
        }
        return PaymentStatusEnum::PENDING;
    }

    private function getCustomerAddressSnapshot(int $customerId, OrderTypeEnum $orderType): array
    {
        if ($orderType !== OrderTypeEnum::DELIVERY) {
            return [];
        }

        $address = CustomerAddress::where('customer_id', $customerId)->where('is_primary', true)->first();
        if (!$address) {
            return [];
        }

        return [
            'customer_address_id' => $address->id,
            'recipient_address_label' => $address->address_label,
            'recipient_name' => $address->recipient_name,
            'recipient_phone_number' => $address->phone_number,
            'recipient_email' => $address->email,
            'recipient_address' => $address->complete_address,
            'delivery_note' => $address->note_to_courier,
        ];
    }

    private function getDineInSnapshot(Request $request, OrderTypeEnum $orderType): array
    {
        if ($orderType !== OrderTypeEnum::DINEIN) {
            return [];
        }

        $table = Table::find($request->dine_in_table_id);
        if (!$table) {
            return [];
        }

        return [
            'dine_in_table_id' => $table->id,
            'dine_in_table_label' => $table->name,
        ];
    }

    public function payWithCash(TransactionRequest $request, string $transactionCode): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->firstOrFail();

        $transaction = $this->getTransaction($transactionCode);
        $fees = $this->getFees();
        $orderType = OrderTypeEnum::tryFrom($request->order_type) ?? OrderTypeEnum::DINEIN;
        $paymentMethod = PaymentMethodEnum::tryFrom($request->payment_method) ?? PaymentMethodEnum::CASH;

        $subtotal = $transaction->subtotal_transaction_item;
        $deliveryFee = $this->calculateDeliveryFee($orderType, $fees);
        $applicationServiceFee = $fees['application_service_fee']->amount ?? 0;

        [$discountTotal, $couponSnapshot] = $this->calculateDiscount($request->coupon_id, $subtotal);
        $finalTotal = $subtotal + $deliveryFee + $applicationServiceFee - $discountTotal;

        if ($paymentMethod === PaymentMethodEnum::CASH && $request->cash_received_amount < $finalTotal) {
            return redirect()
                ->back()
                ->withErrors(['cash_received_amount' => 'Uang Anda kurang.']);
        }

        $cashReceivedAmount = $paymentMethod === PaymentMethodEnum::CASH ? $request->cash_received_amount : null;
        $changeAmount = $cashReceivedAmount !== null ? $cashReceivedAmount - $finalTotal : 0;
        $paymentStatus = $this->getPaymentStatus($paymentMethod, $cashReceivedAmount, $finalTotal);

        $customerAddressSnapshot = $this->getCustomerAddressSnapshot($customer->id, $orderType);
        $dineInSnapshot = $this->getDineInSnapshot($request, $orderType);

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

        OrderStatus::create([
            'transaction_id' => $transaction->id,
            'status' => OrderStatusEnum::PENDING,
        ]);

        return redirect()
            ->route('transaction.success', ['transactionCode' => $transactionCode])
            ->with('message', 'Transaksi sudah selesai dibayar.');
    }

    public function payWithMidtrans(TransactionRequest $request, string $transactionCode): RedirectResponse
    {
        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->firstOrFail();
        $transaction = $this->getTransaction($transactionCode);
        $transaction->load('transactionItems');

        $fees = $this->getFees();
        $orderType = OrderTypeEnum::tryFrom($request->order_type) ?? OrderTypeEnum::DINEIN;
        $paymentMethod = PaymentMethodEnum::tryFrom($request->payment_method) ?? PaymentMethodEnum::CASHLESS;

        $subtotalTransactionItems = $transaction->subtotal_transaction_item;
        $deliveryFee = $this->calculateDeliveryFee($orderType, $fees);
        $applicationServiceFee = $fees['application_service_fee']->amount ?? 0;

        [$discountTotal, $couponSnapshot] = $this->calculateDiscount($request->coupon_id, $subtotalTransactionItems);
        $finalTotal = $subtotalTransactionItems + $deliveryFee + $applicationServiceFee - $discountTotal;

        $customerAddressSnapshot = $this->getCustomerAddressSnapshot($customer->id, $orderType);
        $dineInSnapshot = $this->getDineInSnapshot($request, $orderType);

        $itemDetails = $transaction->transactionItems
            ->map(
                fn($item) => [
                    'id' => $item->id,
                    'name' => $item->menu_item_name,
                    'price' => $item->menu_item_price,
                    'quantity' => $item->quantity,
                ],
            )
            ->toArray();

        if ($deliveryFee > 0) {
            $itemDetails[] = ['id' => 'delivery_fee', 'name' => 'Biaya Pengiriman', 'price' => $deliveryFee, 'quantity' => 1];
        }

        if ($applicationServiceFee > 0) {
            $itemDetails[] = ['id' => 'application_service_fee', 'name' => 'Biaya Layanan Aplikasi', 'price' => $applicationServiceFee, 'quantity' => 1];
        }

        if ($discountTotal > 0) {
            $itemDetails[] = ['id' => 'discount_total', 'name' => 'Diskon', 'price' => -$discountTotal, 'quantity' => 1];
        }

        // Konfigurasi Midtrans
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');

        $customerDetails = [
            'first_name' => $user->full_name,
            'phone' => $user->phone_number,
            'email' => $user->email,
        ];

        if (!empty($customerAddressSnapshot)) {
            $customerDetails['shipping_address'] = [
                'first_name' => $customerAddressSnapshot['recipient_name'],
                'phone' => $customerAddressSnapshot['recipient_phone_number'],
                'email' => $customerAddressSnapshot['recipient_email'],
                'address' => $customerAddressSnapshot['recipient_address'],
            ];
        }

        $midtransParams = [
            'transaction_details' => [
                'order_id' => $transaction->transaction_code,
                'gross_amount' => $finalTotal,
            ],
            'customer_details' => $customerDetails,
            'item_details' => $itemDetails,
            'notification_url' =>  url('/api/midtrans/notification'),
            'callbacks' => [
                'finish' => route('transaction.success', ['transactionCode' => $transaction->transaction_code]),
                'pending' => route('transaction.pending', ['transactionCode' => $transaction->transaction_code]),
                'error' => route('transaction.failed', ['transactionCode' => $transaction->transaction_code]),
            ],
        ];

        $snapToken = Snap::getSnapToken($midtransParams);

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
                $couponSnapshot,
                $customerAddressSnapshot,
                $dineInSnapshot,
            ),
        );

        OrderStatus::create([
            'transaction_id' => $transaction->id,
            'status' => OrderStatusEnum::PENDING,
        ]);

        return redirect()
            ->back()
            ->with(['snap_token' => $snapToken]);
    }

    public function midtransNotification(Request $request): mixed
    {
        // 1. Validasi Signature Key
        $serverKey = config('services.midtrans.server_key');
        $hashed = hash('sha512', $request->input('order_id') . $request->input('status_code') . $request->input('gross_amount') . $serverKey);

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

    public function transactionSuccess(string $transactionCode): InertiaResponse|RedirectResponse
    {
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();
        if (!$transaction || $transaction->payment_status !== PaymentStatusEnum::PAID) {
            return redirect('/')->with('error', 'Transaksi tidak ditemukan atau status tidak valid.');
        }

        return Inertia::render('customer/pages/transaction/success', [
            'message' => 'Pembayaran berhasil! Terima kasih telah memesan.',
            'transaction' => $transaction,
        ]);
    }

    public function transactionPending(string $transactionCode): InertiaResponse|RedirectResponse
    {
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();
        if (!$transaction || $transaction->payment_status !== PaymentStatusEnum::PENDING) {
            return redirect('/')->with('error', 'Transaksi tidak ditemukan atau status tidak valid.');
        }

        return Inertia::render('customer/pages/transaction/pending', [
            'message' => 'Pembayaran pending.',
            'transaction' => $transaction,
        ]);
    }

    public function transactionFailed(string $transactionCode): InertiaResponse|RedirectResponse
    {
        $transaction = Transaction::where('transaction_code', $transactionCode)->first();
        if (!$transaction || $transaction->payment_status !== PaymentStatusEnum::FAILED) {
            return redirect('/')->with('error', 'Transaksi tidak ditemukan atau status tidak valid.');
        }

        return Inertia::render('customer/pages/transaction/failed', [
            'message' => 'Pembayaran gagal. Silakan coba lagi atau hubungi kasir.',
            'transaction' => $transaction,
        ]);
    }
}
