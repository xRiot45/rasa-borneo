<?php

use App\Enums\OrderLocationEnum;
use App\Enums\OrderTypeEnum;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code');

            //   -- Relasi ke tabel
            $table->foreignId('customer_id')->nullable()->constrained('customers')->nullOnDelete();
            $table->foreignId('merchant_id')->nullable()->constrained('merchants')->nullOnDelete();

            //   -- Informasi Tipe Order & Lokasi Order
            $table->enum('order_type', OrderTypeEnum::values())->nullable();
            $table->enum('order_location', OrderLocationEnum::values())->nullable();

            //   -- Informasi Pembayaran
            $table->enum('payment_method', PaymentMethodEnum::values())->nullable();
            $table->enum('payment_status', PaymentStatusEnum::values())->default(PaymentStatusEnum::PENDING);
            $table->string('payment_reference')->nullable();
            $table->integer('cash_received_amount')->default(0);
            $table->integer('change_amount')->default(0);

            //   -- Snapshot dari customer_address_id (khusus untuk delivery)
            $table->foreignId('customer_address_id')->nullable()->constrained('customer_addresses')->nullOnDelete();
            $table->string('recipient_address_label')->nullable();
            $table->string('recipient_name')->nullable();
            $table->string('recipient_phone_number')->nullable();
            $table->string('recipient_email')->nullable();
            $table->string('recipient_address')->nullable();
            $table->string('delivery_note')->nullable();

            //   -- Snapshot dari table (khusus dine-in)
            $table->foreignId('dine_in_table_id')->nullable()->constrained('tables')->nullOnDelete();
            $table->string('dine_in_table_label')->nullable();

            //   -- Informasi customer (khusus dine-in, takeway dan pickup)
            $table->string('orderer_name')->nullable();
            $table->string('orderer_phone_number')->nullable();

            //   -- Snapshot dari coupon_id (Informasi Kupon)
            $table->foreignId('coupon_id')->nullable()->constrained('coupons')->nullOnDelete();
            $table->string('coupon_code')->nullable();
            $table->string('coupon_type')->nullable();
            $table->integer('coupon_discount')->default(0);

            //     -- Informasi Tambahan
            $table->string('note')->nullable();

            //   -- Perhitungan Transaksi
            $table->integer('subtotal_transaction_item')->default(0);
            $table->integer('delivery_fee')->default(0);
            $table->integer('application_service_fee')->default(0);
            $table->integer('discount_total')->default(0);
            $table->integer('final_total')->default(0);

            //   -- Waktu checkout
            $table->timestamp('checked_out_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
