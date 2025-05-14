<?php

use App\Enums\CouponTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained()->onDelete('cascade'); // kupon dibuat oleh merchant tertentu
            $table->string('code')->unique(); // Contoh: HEMAT20
            $table->enum('type', CouponTypeEnum::values()); // Jenis diskon
            $table->decimal('value', 10, 2); // Nilai diskon (misal 20% atau 20000)
            $table->decimal('min_purchase', 10, 2)->default(0); // Minimal pembelian
            $table->timestamp('start_date')->nullable(); // Tanggal mulai berlaku
            $table->timestamp('end_date')->nullable(); // Tanggal berakhir
            $table->boolean('is_active')->default(true); // Bisa di-nonaktifkan kapan saja oleh merchant
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
