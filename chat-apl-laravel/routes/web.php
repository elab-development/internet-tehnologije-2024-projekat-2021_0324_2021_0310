<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/reset-password/{token}', function ($token) {
    return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');

Route::get('/download/{file}', function ($file) {
    $path = 'attachments/' . $file;

    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return Response::download(storage_path("app/public/$path"));
});

require __DIR__.'/settings.php';
//require __DIR__.'/auth.php';
