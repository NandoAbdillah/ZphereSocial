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
        Schema::create('zphere_libraries', function (Blueprint $table) {
            $table->id();
            $table->uuid("uuid");
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('thumbnail');
            $table->string('category');
            $table->string('synopsis');
            $table->string('description');
            $table->string('content');
            $table->bigInteger('views');
            $table->bigInteger('likes');
            $table->double('rating');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zphere_libraries');
    }
};
