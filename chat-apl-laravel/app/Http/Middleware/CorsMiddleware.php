<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin'      => 'http://localhost:3000',
            'Access-Control-Allow-Methods'     => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'     => 'Origin, Content-Type, Authorization, Accept, X-Requested-With',
            'Access-Control-Allow-Credentials' => 'true',
        ];

        // Ako je preflight zahtev (OPTIONS), vrati samo zaglavlja
        if ($request->getMethod() === "OPTIONS") {
            return response()->json(['status' => 'CORS Preflight OK'], 200)->withHeaders($headers);
        }

        // Inače nastavi normalno i dodaj CORS zaglavlja
        $response = $next($request);
        foreach ($headers as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }
}
