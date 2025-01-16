<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Middleware\JwtMiddleware;
use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use LaravelJsonApi\Laravel\Routing\ResourceRegistrar;
use LaravelJsonApi\Laravel\Routing\Relationships;


Route::middleware([])->prefix('v1')->group(function () {
    Route::group([
        'prefix' => 'auth'
    ], function () {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::middleware(['auth.jwt'])->group(function () {
            Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
            Route::get('/profile', [AccountController::class, 'profile'])->name('profile');
            Route::patch('/update-profile', [AccountController::class, 'updateProfile'])->name('update-profile');
            Route::patch('/update-password', [AccountController::class, 'updatePassword'])->name('update-password');
        });
    });
    Route::middleware(['auth.jwt'])->group(function () {
        JsonApiRoute::server('v1')
            ->resources(function (ResourceRegistrar $server) {
            $server->resource('settings', JsonApiController::class);
            $server->resource('medias', JsonApiController::class);
            $server->resource('users', JsonApiController::class);
            $server->resource('roles', JsonApiController::class);
            $server->resource('permissions', JsonApiController::class);
            $server->resource('tags', JsonApiController::class)
                ->relationships(function (Relationships $relations) {
                    $relations->hasMany('posts')->readOnly();
                });
            $server->resource('posts', JsonApiController::class)
                ->relationships(function (Relationships $relations) {
                    $relations->hasOne('author')->readOnly();
                    $relations->hasMany('comments')->readOnly();
                    $relations->hasMany('tags')->readOnly();
                });
            $server->resource('comments', JsonApiController::class);
        });
    });
});