<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Exception $exception, Request $request) {
            $status = 500; // Giá trị mặc định nếu không xác định được
            if (method_exists($exception, 'getStatusCode')) {
                $status = $exception->getStatusCode(); // Lấy status code từ exception
            } elseif ($exception instanceof \Illuminate\Validation\ValidationException) {
                $status = 422; // Xử lý lỗi validation riêng
            } elseif ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                $status = 401; // Lỗi authentication
            } elseif ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface) {
                $status = $exception->getStatusCode(); // Symfony HTTP exception
            }
            
            if ($request->is('api/*')) {
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
        $exceptions->dontReportDuplicates();
        $exceptions->render(
            \LaravelJsonApi\Exceptions\ExceptionParser::renderer(),
        );
    })->create();
