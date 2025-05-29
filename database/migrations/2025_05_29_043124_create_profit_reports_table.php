<?php

use App\Enums\ReportTypeEnum;
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
        Schema::create('profit_reports', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('report_type', [ReportTypeEnum::values()])->default(ReportTypeEnum::DAILY);
            $table->bigInteger('total_revenue');
            $table->bigInteger('total_expense');
            $table->bigInteger('gross_profit');
            $table->bigInteger('net_profit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profit_reports');
    }
};
