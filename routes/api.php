<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotesController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//AUTHENTICATION
Route::post('/sign-up', [AuthController::class,'signUp']);
Route::post('/sign-in', [AuthController::class,'signIn']);

Route::prefix('auth')->middleware('auth:sanctum')->group(function () {
    Route::delete('/sign-out', [AuthController::class,'signOut']);    
    
    //DASHBOARD
    Route::prefix('dashboard')->group(function () {
        Route::get('/notes', [DashboardController::class,'notes']);  
        Route::get('/tags', [DashboardController::class,'tags']); 
    }); 

    //NOTES
    Route::prefix('notes')->group(function () {
        Route::get('/', [NotesController::class,'index']); 
        Route::get('/{id}', [NotesController::class,'show']);  
        Route::post('/', [NotesController::class,'store']);
        Route::patch('/{id}', [NotesController::class,'update']);
        Route::delete('/{id}', [NotesController::class,'destroy']); 
    }); 
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

