<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('react');
// });

// Route::get( '/{path?}', function(){
//     return view('react');
// } )->where('path', '.*');

Route::get('{reactRoutes}', function () {
    return view('react'); // your start view
})->where('reactRoutes', '^((?!api).)*$'); // except 'api' word



Route::post('/api/doituong', 'DoiTuongController@store');
Route::post('/api/doituongs', 'DoiTuongController@storeMutipleItems');
Route::put('/api/doituong/{id}', 'DoiTuongController@update');
Route::delete('/api/doituong/{id}', 'DoiTuongController@destroy');


Route::post('/api/signup', 'AuthController@doSignUp');


