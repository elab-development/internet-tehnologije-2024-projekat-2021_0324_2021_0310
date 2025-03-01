<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    //statistika, upravljanje userima 
    public function stats() {
        return response()->json([
            'total_users' => User::count(),
            'suspended_users' => User::whereNotNull('suspended_at')->count(),
            'total_messages' => Message::count()
        ]);
    }

    public function listUsers() {
        return response()->json(User::all());
    }

    public function deleteUser(User $user) {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
