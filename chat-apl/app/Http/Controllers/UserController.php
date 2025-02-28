<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
 
    public function index(): JsonResponse
    {
        return response()->json(['users' => User::all()]);
    }
 
    public function show(User $user): JsonResponse
    {
        return response()->json(['user' => $user]);
    }
}
