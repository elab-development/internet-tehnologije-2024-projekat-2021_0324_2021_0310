<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * Globalni middleware koji se izvršava na svakom HTTP zahtevu.
     */
    protected $middleware = [
        \App\Http\Middleware\CorsMiddleware::class,
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
       
        

    ];

    /**
     * Middleware grupe za Web i API rute.
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            'throttle:60,1', // Ograničava broj API poziva (60 zahteva u 1 minutu)
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\CorsMiddleware::class,
        ],
    ];

    /**
     * Middleware koji se mogu dodati pojedinačnim rutama.
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class, 
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,

        // Naši custom middleware-i
        'role' => \App\Http\Middleware\RoleMiddleware::class, // Proverava korisničku ulogu (admin, moderator, user)
        'own-data' => \App\Http\Middleware\EnsureUserOwnsData::class, // Osigurava da korisnik može menjati samo svoje podatke
    ];
}
