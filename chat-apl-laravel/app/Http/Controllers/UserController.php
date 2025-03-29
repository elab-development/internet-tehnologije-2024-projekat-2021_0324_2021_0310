<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function countUsers()
{
    $count = \App\Models\User::count();
    return response()->json(['count' => $count]);
}

    public function index(): JsonResponse
    {
        return response()->json(['users' => User::all()]);
    }
 
    public function show(User $user): JsonResponse
    {
        return response()->json(['user' => $user]);
    }
    
    public function searchUsers(Request $request) {
        $query = User::query();

        if ($request->has('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }
        if ($request->has('email')) {
            $query->where('email', 'LIKE', '%' . $request->email . '%');
        }
        if ($request->has('id')) {
            $query->where('id', $request->id);
        }

        return response()->json($query->get());
    }

    

}
