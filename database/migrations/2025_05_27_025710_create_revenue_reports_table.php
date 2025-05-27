<?php

use App\Enums\ReportTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('revenue_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')->constrained('merchants');
            $table->date('report_date');
            $table->enum('report_type', [ReportTypeEnum::values()])->default(ReportTypeEnum::DAILY);
            $table->integer('total_transaction'); // Total transaksi yang berhasil
            $table->bigInteger('total_revenue'); // Total pendapatan dari transaksi sukses
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revenue_reports');
    }
};
