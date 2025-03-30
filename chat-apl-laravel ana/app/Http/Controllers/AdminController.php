<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //statistika, upravljanje userima 
   


    public function listUsers(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
    
        return response()->json(\App\Models\User::all());
    }
    

    public function deleteUser(User $user) {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function countReports()
{
    $count = \App\Models\ReportedMessage::count(); // ili Report, ako ti se model zove drugačije

    return response()->json([
        'count' => $count,
    ]);
}

    public function countMessages()
    {
        $totalMessages = \App\Models\Message::count();
    
        return response()->json([
            'count' => $totalMessages,
        ]);
    }
    
    public function checkRole(Request $request)
{
    $user = Auth::user();

    if ($user && $user->role === 'admin') {
        return response()->json(['is_admin' => true]);
    }

    return response()->json(['is_admin' => false], 403);
}
}