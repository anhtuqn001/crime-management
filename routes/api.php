<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::group([
    'middleware' => ['jwtverify']
], function ($router) {
    Route::get('doituong', 'DoiTuongController@index');
    Route::get('user', 'AuthController@getAuthenticatedUser');
    Route::post('changepassword', 'AuthController@changePassword');
});

Route::post('login', 'AuthController@doLogin');
