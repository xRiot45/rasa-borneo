<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained('transactions')->cascadeOnDelete();
            $table->unsignedBigInteger('menu_item_id');
            $table->string('menu_item_name')->nullable();
            $table->integer('menu_item_price')->default(0);
            $table->text('menu_item_image_url');
            $table->string('menu_item_category')->nullable();
            $table->integer('quantity')->default(0);
            $table->string('note')->nullable();
            $table->integer('subtotal')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_items');
    }
};
