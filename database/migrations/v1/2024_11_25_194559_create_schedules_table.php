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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("order_product_id");
            $table->unsignedBigInteger("worker_assigned_to")->default(null);
            $table->dateTime("booked_for")->default(null);
            $table->timestamps();

            $table->foreign("order_product_id")
                ->references("id")
                ->on("order_products");
            $table->foreign("worker_assigned_to")
                ->references("id")
                ->on("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
