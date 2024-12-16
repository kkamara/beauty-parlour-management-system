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
        Schema::table('orders', function (Blueprint $table) {
            $table->string("worker_assigned")
                ->nullable()
                ->default(null)
                ->after("price");
            $table->dateTime("date_time")
                ->nullable()
                ->default(null)
                ->after("worker_assigned");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn("worker_assigned");
            $table->dropColumn("date_time");
        });
    }
};
