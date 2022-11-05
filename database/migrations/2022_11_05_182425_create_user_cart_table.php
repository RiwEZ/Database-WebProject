<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_cart', function (Blueprint $table) {
            $table->bigInteger('userId')->unsigned();
            $table->string('productCode', 15)->collation('latin1_swedish_ci');
            $table->primary(['userId', 'productCode']);

            $table->foreign('userId')
                ->references('id')->on('users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('productCode')
                ->references('productCode')->on('products')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->integer('productQuantity')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_cart');
    }
};
