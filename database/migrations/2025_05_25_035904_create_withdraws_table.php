<?php

use App\Enums\WithdrawStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained('merchants');
            $table->string('withdraw_code', 50)->unique();
            $table->integer('amount');
            $table->string('bank_code');
            $table->string('bank_account_number');
            $table->string('bank_account_name');
            $table->enum('status', WithdrawStatusEnum::values())->default(WithdrawStatusEnum::PENDING);
            $table->text('note')->nullable();
            $table->timestamp('requested_at');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('transferred_at')->nullable();
            $table->string('transfer_proof')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraws');
    }
};
