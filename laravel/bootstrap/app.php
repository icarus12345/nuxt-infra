<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'auth.jwt' => \App\Http\Middleware\JwtMiddleware::class,
            'api.response' => \App\Http\Middleware\ApiResponse::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Exception $exception, Request $request) {
            if ($request->is('api/*')) {
                $status = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;

                return response()->json([
                    'error' => true,
                    'message' => $exception->getMessage() ?: 'An unexpected error occurred',
                    'track' => config('app.debug') ? $exception->getTrace() : null,
                ], $status);
            }
        });
        $exceptions->dontReport(
            \LaravelJsonApi\Core\Exceptions\JsonApiException::class,
        );
        $exceptions->render(
            \LaravelJsonApi\Exceptions\ExceptionParser::renderer(),
        );
    })->create();
