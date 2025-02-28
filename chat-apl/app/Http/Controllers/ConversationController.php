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
}
