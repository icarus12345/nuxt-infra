<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('permissions', function (Blueprint $table) {
            //$table->engine('InnoDB');
            $table->increments('id');
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();

            $table->unique(['name', 'guard_name']);
        });

        Schema::create('roles', function (Blueprint $table)  {
            //$table->engine('InnoDB');
            $table->increments('id'); // role id
            $table->string('name');       // For MyISAM use string('name', 225); // (or 166 for InnoDB with Redundant/Compact row format)
            $table->string('guard_name'); // For MyISAM use string('guard_name', 25);
            $table->timestamps();
            $table->unique(['name', 'guard_name']);
        });

        Schema::create('role_permission', function (Blueprint $table) {
            $table->unsignedInteger('role_id');

            $table->unsignedInteger('permission_id');

            $table->foreign('permission_id')
                ->references('id') // permission id
                ->on('permissions')
                ->onDelete('cascade');

        });

        Schema::create('user_role', function (Blueprint $table) {
            $table->unsignedInteger('user_id');

            $table->unsignedInteger('role_id');
            $table->foreign('role_id')
                ->references('id') // role id
                ->on('roles')
                ->onDelete('cascade');
        });

        Schema::create('user_permission', function (Blueprint $table) {
            $table->unsignedInteger('user_id');

            $table->unsignedInteger('permission_id');

            $table->foreign('permission_id')
                ->references('id') // permission id
                ->on('permissions')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('user_permission');
        Schema::drop('role_permission');
        Schema::drop('user_role');
        Schema::drop('roles');
        Schema::drop('permissions');
    }
};
