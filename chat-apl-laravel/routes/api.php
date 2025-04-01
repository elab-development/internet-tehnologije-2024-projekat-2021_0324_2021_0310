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
use App\Http\Controllers\ChatController;

Route::get('/greeting', function () {
    return response()->json(['message' => 'Hello World'], 201);
});


// Autentifikacija korisnika
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/captcha', [AuthController::class, 'getCaptcha']);

Broadcast::routes(['middleware' => ['auth:sanctum']]);



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
    Route::middleware('auth:sanctum')->get('/available-users', [ChatController::class, 'getAvailableUsers']);//lista korisnika sa role = user
    Route::middleware('auth:sanctum')->post('/start-chat', [ChatController::class, 'startChat']);//za kreiranje novog ceta

    Route::get('/users/count', [UserController::class, 'countUsers']);
    // ADMIN rute
    Route::put('/admin/users/{id}/role', [AdminController::class, 'updateRole']);
    
    Route::middleware('auth:sanctum')->get('/admin/reports/count', [AdminController::class, 'countReports']);
    Route::middleware('auth:sanctum')->get('/admin/messages/count', [AdminController::class, 'countMessages']);
    Route::middleware(['auth:sanctum'])->get('/admin/users', [AdminController::class, 'listUsers']);
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin', function (\Illuminate\Http\Request $request) {
            if ($request->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
            return response()->json(['message' => 'Welcome Admin!']);
        });
        Route::middleware('auth:sanctum')->get('/admin', [AdminController::class, 'checkRole']);
        Route::delete('/admin/users/{user}', [AdminController::class, 'deleteUser']);
    });

    Route::get('/user-info', function (\Illuminate\Http\Request $request) {
        return response()->json([
            'id' => $request->user()->id,
            'email' => $request->user()->email,
            'suspended_until' => $request->user()->suspended_until,
        ]);
    });
    // MODERATOR rute
    Route::middleware('auth:sanctum')->prefix('moderator')->group(function () {
        Route::get('/reported-messages', [ModeratorController::class, 'reportedMessages']);
        Route::post('/suspend-user/{user}', [ModeratorController::class, 'suspendUser']);
        Route::post('/resolve-report/{report}', [ModeratorController::class, 'resolveReport']);
    });

    // Prijavljivanje korisnika
    Route::post('/report-user/{user}', [ReportController::class, 'reportUser']);
    Route::get('/report-reasons', [ReportController::class, 'getReportReasons']);

    Route::post('/messages/{message}/report', [ReportController::class, 'reportMessage']);

    // Upload i preuzimanje dokumenata
    Route::post('/messages/{message}/attachments', [MessageAttachmentController::class, 'store']);
    Route::get('/attachments/{id}/download', [MessageAttachmentController::class, 'download']);

    // Slanje poruka sa prilozima
    Route::post('/messages/send-with-attachments', [MessageController::class, 'sendMessageWithAttachment']);

    
     // Pretraga po kriterijumima
     Route::get('/search/users', [UserController::class, 'searchUsers']);
     Route::get('/search/messages', [MessageController::class, 'searchMessages']);
     Route::get('/search/conversations', [ConversationController::class, 'searchConversations']);

     Route::middleware('auth:sanctum')->get('/chats', [ChatController::class, 'index']);
});
Route::options('/{any}', function () {
    return response()->json([], 200);
})->where('any', '.*');







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