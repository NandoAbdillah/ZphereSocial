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
        Schema::create('zphere_pays', function (Blueprint $table) {
            $table->id();
            $table->uuid("uuid");
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('telp')->unique();
            $table->enum('currency', ['IDR','USD'])->default('IDR');
            $table->decimal('saldo', 12,2);
            $table->timestamp('verified_at')->nullable();
            $table->string('pin');
            $table->enum('status', [0, 1])->default(1);
            $table->enum('level', ['bronze', 'silver', 'gold', 'platinum', 'diamond','vvip', 'elite', 'premier'])->default('bronze');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zphere_pays');
    }
};
