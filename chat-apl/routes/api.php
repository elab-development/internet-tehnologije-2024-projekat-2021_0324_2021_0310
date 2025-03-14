<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MessageAttachmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ModeratorController;
use App\Http\Controllers\ReportController;

Route::get('/greeting', function () {
    return response()->json(['message' => 'Hello World'], 201);
});


// Autentifikacija korisnika
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/captcha', [AuthController::class, 'getCaptcha']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Resursna ruta za poruke
    Route::apiResource('messages', MessageController::class)->middleware('own-data');
    
    // API rute za chat aplikaciju
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::get('/conversations/{conversation}/messages', [MessageController::class, 'getMessages']);
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
    Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy']);
    Route::put('/messages/{message}', [MessageController::class, 'update']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
    
    Route::post('/messages/{message}/attachments', [MessageAttachmentController::class, 'store']);
    // ADMIN rute
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/stats', [AdminController::class, 'stats']);
        Route::get('/admin/users', [AdminController::class, 'listUsers']);
        Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);
    });

    // MODERATOR rute
    Route::middleware('role:moderator')->group(function () {
        Route::get('/moderator/reported-messages', [ModeratorController::class, 'reportedMessages']);
        Route::post('/moderator/suspend-user/{user}', [ModeratorController::class, 'suspendUser']);
    });

    // Prijavljivanje korisnika
    Route::post('/report-user/{user}', [ReportController::class, 'reportUser']);
    Route::get('/report-reasons', [ReportController::class, 'getReportReasons']);

    // Upload i preuzimanje dokumenata
    Route::post('/messages/{message}/attachments', [MessageAttachmentController::class, 'store']);
    Route::get('/attachments/{id}/download', [MessageAttachmentController::class, 'download']);

    // Slanje poruka sa prilozima
    Route::post('/messages/send-with-attachments', [MessageController::class, 'sendMessageWithAttachment']);

    
     // Pretraga po kriterijumima
     Route::get('/search/users', [UserController::class, 'searchUsers']);
     Route::get('/search/messages', [MessageController::class, 'searchMessages']);
     Route::get('/search/conversations', [ConversationController::class, 'searchConversations']);


});







/*
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
});*/