<?php

use App\Enums\GenderEnum;
use App\Enums\VehicleTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('couriers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('vehicle_type', [VehicleTypeEnum::values()])->default(VehicleTypeEnum::MOTORCYCLE);
            $table->string('national_id');
            $table->text('id_card_photo');
            $table->integer('age')->default(0)->nullable();
            $table->string('birthplace')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('profile_image')->nullable();
            $table->enum('gender', GenderEnum::values())->nullable();
            $table->text('driving_license_photo')->nullable();
            $table->string('license_plate')->nullable();
            $table->boolean('is_online')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('couriers');
    }
};
