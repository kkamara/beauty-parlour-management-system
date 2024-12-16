<?php

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
        Schema::create('preferred_schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("order_id");
            $table->datetime("date_time");
            $table->timestamps();

            $table->foreign("order_id")
                ->references("id")
                ->on("orders");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preferred_schedules');
    }
};
