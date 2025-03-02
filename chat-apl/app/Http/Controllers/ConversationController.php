<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversationController extends Controller
{
    
    public function index(Request $request) {
        return response()->json(Conversation::where('user_id', $request->user()->id)->get());
    }

    public function store(Request $request) {
        $conversation = Conversation::create($request->all());
        return response()->json($conversation, 201);

    }

    public function destroy(Conversation $conversation) {
        $conversation->delete();
        return response()->json(['message' => 'Conversation deleted successfully'], 200);
    }


    public function searchConversations(Request $request) {
        $query = Conversation::query();

        if ($request->has('user_id')) {
            $query->whereHas('users', function ($q) use ($request) {
                $q->where('users.id', $request->user_id);
            });
        }
        if ($request->has('keyword')) {
            $query->whereHas('messages', function ($q) use ($request) {
                $q->where('content', 'LIKE', '%' . $request->keyword . '%');
            });
        }

        return response()->json($query->get());
    }
}
