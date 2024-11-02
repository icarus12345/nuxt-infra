<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            // Token đã hết hạn
            return response()->json(['error' => 'Token expired'], 401);

        } catch (TokenInvalidException $e) {
            // Token không hợp lệ
            return response()->json(['error' => 'Token invalid'], 401);

        } catch (JWTException $e) {
            // Không có token trong request
            return response()->json(['error' => 'Token absent', "code" => $e->getCode(), "track" => $e->getTrace()], 401);

        } catch (Exception $e) {
            // Các lỗi khác
            return response()->json(['error' => 'Authentication error',  "code" => $e->getCode(), "track" => $e->getTrace()], 500);
        }

        return $next($request);
    }
}