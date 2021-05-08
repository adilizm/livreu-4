<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\CategoreisController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'signin']);
Route::get('/gg', [AuthController::class, 'hello']);


Route::middleware('auth:sanctum')->group( function () {
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::get('/getCategoreis', [CategoreisController::class, 'getAllCategoreis']);
    Route::post('/new_category', [CategoreisController::class, 'store'])->name('new_category');
    Route::post('/new_order', [OrderController::class, 'store']);
    Route::get('/CurrentUserOrders/{id}', [OrderController::class, 'GetUserOrders']);
    Route::get('/allOrders', [OrderController::class, 'allOrders']);
    Route::get('/orderlivre/{id}', [OrderController::class, 'orderlivre']);
    Route::get('/deleteCategory/{id}', [CategoreisController::class, 'delete']);
    Route::post('/update_Profile_image', [Controller::class, 'update_user_profile']);
});

