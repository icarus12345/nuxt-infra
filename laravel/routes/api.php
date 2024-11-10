<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
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
        Route::any('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::middleware(['auth.jwt'])->group(function () {
            Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
            Route::get('/profile', [AuthController::class, 'profile'])->name('profile');
        });
    });
    Route::middleware(['auth.jwt'])->group(function () {
        JsonApiRoute::server('v1')
            ->resources(function (ResourceRegistrar $server) {
            $server->resource('users', JsonApiController::class);
            $server->resource('roles', JsonApiController::class);
            $server->resource('permissions', JsonApiController::class);
            $server->resource('posts', JsonApiController::class)
            ->relationships(function (Relationships $relations) {
                $relations->hasOne('author')->readOnly();
                $relations->hasMany('comments')->readOnly();
                $relations->hasMany('tags')->readOnly();
            });;
            $server->resource('comments', JsonApiController::class);
        });
    });
});