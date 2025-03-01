<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MessageAttachmentController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Broadcast;
use App\Events\MessageSent;

// Autentifikacija korisnika
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Resursna ruta za poruke
    Route::apiResource('messages', MessageController::class);
    
    // API rute za chat aplikaciju
    // Dohvatanje svih razgovora korisnika
    Route::get('/conversations', [ConversationController::class, 'index']);
    
    // Kreiranje nove konverzacije
    Route::post('/conversations', [ConversationController::class, 'store']);
    
    // Dohvatanje poruka iz određene konverzacije
    Route::get('/conversations/{conversation}/messages', [MessageController::class, 'getMessages']);
    
    // Slanje poruke u konverzaciju
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
    
    // Upload priloga na poruku
    Route::post('/messages/{message}/attachments', [MessageAttachmentController::class, 'store']);
    
    // Brisanje konverzacije
    Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy']);
    
    // Editovanje poruke
    Route::put('/messages/{message}', [MessageController::class, 'update']);
    
    // Brisanje poruke
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
});