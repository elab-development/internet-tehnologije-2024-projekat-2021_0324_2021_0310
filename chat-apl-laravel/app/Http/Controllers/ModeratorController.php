<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class ModeratorController extends Controller
{
    //riportovane poruke i suspendovan
    public function reportedMessages() {
        return response()->json(Message::where('reported', true)->get());
    }

    public function checkRole(Request $request)
    {
        $user = Auth::user();
    
        if ($user && $user->role === 'moderator') {
            return response()->json(['is_moderator' => true]);
        }
    
        return response()->json(['is_moderator' => false], 403);
    }
    

    public function suspendUser(User $user) {
        $user->update(['suspended_at' => now()]);
        return response()->json(['message' => 'User suspended successfully']);
    }
}
