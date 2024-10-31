<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;

class ApiResponse
{
    public function handle($request, Closure $next)
    {
        try {
            return $next($request);
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    protected function handleException(\Throwable $exception): JsonResponse
    {
      return response()->json(['error' => 'Bad Request11111'], 400);
        // Xử lý trả về lỗi tương ứng
        switch ($exception->getStatusCode()) {
            case 400:
                return response()->json(['error' => 'Bad Request'], 400);
            case 401:
                return response()->json(['error' => 'Unauthorized'], 401);
            case 403:
                return response()->json(['error' => 'Forbidden'], 403);
            case 500:
                return response()->json(['error' => 'Internal Server Error'], 500);
            default:
                return response()->json(['error' => 'Something went wrong'], $exception->getStatusCode() ?: 500);
        }
    }
}