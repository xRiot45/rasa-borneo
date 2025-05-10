<?php

use App\Enums\DayEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('store_operating_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained('merchants')->onDelete('cascade');
            $table->enum('day_of_week', DayEnum::values());
            $table->time('open_time');
            $table->time('close_time');
            $table->boolean('is_closed')->default(false);
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('store_operating_hours');
    }
};
