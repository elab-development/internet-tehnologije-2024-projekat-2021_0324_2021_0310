<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Registruje broadcasting rute (uključuje broadcasting/auth)
        Broadcast::routes(['middleware' => ['auth:sanctum']]);

        // Učitava definicije kanala iz channels.php
        require base_path('routes/channels.php');
    }
}
