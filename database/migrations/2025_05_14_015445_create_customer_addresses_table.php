<?php

use App\Enums\AddressLabelEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->enum('address_label', AddressLabelEnum::values())->default(AddressLabelEnum::HOME);
            $table->string('complete_address');
            $table->string('note_to_courier')->nullable();
            $table->string('recipient_name');
            $table->string('email');
            $table->string('phone_number');
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_addresses');
    }
};
