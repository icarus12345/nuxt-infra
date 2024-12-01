<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use LaravelJsonApi\Laravel\Http\Controllers\Actions;
use LaravelJsonApi\Core\Responses\DataResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    use Actions\FetchOne;
    // use Actions\Store;
    // use Actions\Update;
    // use Actions\FetchRelated;
    // use Actions\FetchRelationship;
    // use Actions\UpdateRelationship;
    // use Actions\AttachRelationship;
    // use Actions\DetachRelationship;
    // User registration
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'), 201);
    }

    // User login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Get the authenticated user.
            $user = auth()->user();
            $rolePerms = $user->roles()->with('permissions')->get();
            $roles = $rolePerms->pluck('name');
            $permissions = $rolePerms->flatMap(function ($role) {
                return $role->permissions->pluck('name');
            })->unique();

            // (optional) Attach the role to the token.
            $access_token = JWTAuth::claims([
                'roles' => $roles,
                'permissions' => $permissions,
                ])
                ->fromUser($user);

            return DataResponse::make($user)
                ->withMeta([
                    'access_token' => $access_token,
                    'token_type' => 'bearer',
                    'expires_time' => Carbon::now()->addSeconds(JWTAuth::factory()->getTTL()),
                ])
                // ->withIncludePaths('roles.permissions')
                ->withServer('v1');
            
        } catch (JWTException $e) {
            Log::error($e);
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }

    // Get authenticated user
    public function profile()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }
        return DataResponse::make($user)
            ->withIncludePaths('roles.permissions')
            ->withServer('v1');
    }

    // User logout
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out']);
    }
}