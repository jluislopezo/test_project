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

// Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);

Route::get('/', function () {
    return view('app');
});

Route::get('/users', 'HomeController@index');
Route::get('/user/{userId}', 'HomeController@show');
Route::post('/user/createUser', 'HomeController@store');
Route::patch('/user/{userId}', 'HomeController@update');
Route::delete('/user/deleteUser/{userId}', 'HomeController@destroy');