<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            // Informasi Pribadi lainnya
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('id_card_photo');

            // Informasi Bisnis
            $table->string('business_name');
            $table->string('business_phone');
            $table->string('business_email');
            $table->string('postal_code');
            $table->text('business_description');
            $table->text('business_address');
            $table->foreignId('business_category_id')->constrained()->onDelete('cascade');

            // Informasi Rekening Bank
            $table->string('bank_code'); // Kode bank (contoh: 014 untuk BCA)
            $table->string('bank_account_number'); // Nomor rekening
            $table->string('bank_account_name'); // Nama pemilik rekening
            $table->string('tax_identification_number')->nullable(); // NPWP (opsional)

            $table->string('slug')->unique();

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
