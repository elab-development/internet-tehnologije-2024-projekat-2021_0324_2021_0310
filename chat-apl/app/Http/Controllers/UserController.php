<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

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
