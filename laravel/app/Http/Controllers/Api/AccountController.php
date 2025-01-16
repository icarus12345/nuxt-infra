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
use Illuminate\Validation\ValidationException;

class AccountController extends Controller
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

    public function updateProfile(Request $request)
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'avatar' => 'nullable|string|max:255',
                'bio' => 'nullable|string|max:255',
            ]);

            if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
            }

            $user->fill($request->only(['name', 'avatar', 'bio']));
            $user->save();
        } catch (JWTException $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }
        return DataResponse::make($user)
            ->withIncludePaths('roles.permissions')
            ->withServer('v1');
    }

    public function updatePassword(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $password = $request->input('password');
        $oldPassword = $request->input('oldPassword');

        if (!Hash::check($oldPassword, $user->password)) {
            throw ValidationException::withMessages([
                'old_password' => 'Mật khẩu cũ không chính xác.',
            ]);
        }

        $user->password = $password;
        $user->save();
        return DataResponse::make([])
            ->withServer('v1');
    }

    // User logout
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out']);
    }
}