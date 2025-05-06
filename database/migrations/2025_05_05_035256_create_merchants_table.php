<?php

use App\Enums\PayoutStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            // Informasi Pribadi
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('id_card_photo');

            // Informasi Bisnis
            $table->text('business_address');
            $table->text('business_details');
            $table->foreignId('business_category_id')->constrained()->onDelete('cascade');

            // Informasi Rekening Bank
            $table->string('bank_account_number'); // Nomor rekening bank
            $table->string('bank_account_name'); // Nama pemilik rekening bank
            $table->string('bank_code'); // Kode bank
            $table->string('bank_name'); // Nama bank
            $table->string('bank_passbook_photo'); // Foto buku tabungan
            $table->string('tax_identification_number')->nullable();

            // Informasi Payout (Pengambilan Dana (Jika menerapkan fitur payout))
            $table->enum('payout_status', PayoutStatusEnum::values())->nullable();
            $table->timestamp('payout_verified_at')->nullable();

            // Informasi Verifikasi
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};
