<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Request $request){
    $user = $request->user();

    $conversations = \DB::table('conversations')
        ->join('conversation_user', 'conversations.id', '=', 'conversation_user.conversation_id')
        ->where('conversation_user.user_id', $user->id)
        ->select('conversations.*')
        ->distinct()
        ->get()
        ->map(function ($conversation) use ($user) {
            $participants = \DB::table('conversation_user')
                ->join('users', 'users.id', '=', 'conversation_user.user_id')
                ->where('conversation_id', $conversation->id)
                ->select('users.id', 'users.email')
                ->get();

            if ($conversation->name !== null) {
                $title = $conversation->name;
            } else {
                $otherUser = $participants->firstWhere('id', '!=', $user->id);
                $title = $otherUser ? $otherUser->email : 'Nepoznat kontakt';
            }

            $lastMessage = \DB::table('messages')
                ->where('conversation_id', $conversation->id)
                ->orderByDesc('created_at')
                ->first();

            return [
                'id' => $conversation->id,
                'title' => $title,
                'type' => $conversation->name ? 'group' : 'private',
                'last_message' => $lastMessage->content ?? '',
                'time' => optional($lastMessage)->created_at
                    ? \Carbon\Carbon::parse($lastMessage->created_at)->format('H:i')
                    : '',
            ];
        });

    return response()->json($conversations);
}

}
