<?php

use App\Enums\CourierAssignmentStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courier_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('courier_id')->constrained('couriers')->cascadeOnDelete();
            $table->foreignId('transaction_id')->constrained('transactions')->cascadeOnDelete();
            $table->enum('status', [CourierAssignmentStatusEnum::values()])->default(CourierAssignmentStatusEnum::PENDING);
            $table->dateTime('accepted_at')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->text('proof_of_delivery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courier_assigments');
    }
};
