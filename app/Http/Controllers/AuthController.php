<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\User;
use Auth;
use JWTAuth;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['doLogin', 'doSignUp']]);
    }

    public function doSignUp(Request $request) {
        $user = new User();
        $user->email = $request->input('email');
        $user->name = $request->input('tendangnhap');
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return response()->json($user, Response::HTTP_OK);
    }

    public function doLogin(Request $request) {
        $name = $request->input('tendangnhap');
        $password = $request->input('password');
        if($token = $this->guard()->attempt(array($this->username() => $name, 'password' => $password))){
            return $this->respondWithToken($token);
        }
        return response()->json(['success' => false], 401);
    }

    public function username()
    {
        return 'name';
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ], 200);
    }

    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function guard()
    {
        return Auth::guard();
    }

    public function getAuthenticatedUser()
    {
        if (!$user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
        }
        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }
}