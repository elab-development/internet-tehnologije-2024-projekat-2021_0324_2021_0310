<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getAvailableUsers(Request $request)
{
    $currentUser = $request->user();

    $users = \App\Models\User::where('role', 'user')
        ->where('id', '!=', $currentUser->id)
        ->get();

    return response()->json($users);
}

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
public function startChat(Request $request)
{
    $user = $request->user();
    $otherUserId = $request->input('user_id');

    if ($user->id == $otherUserId) {
        return response()->json(['message' => 'Ne možeš započeti chat sam sa sobom.'], 400);
    }

    // Pronađi postojeći privatni chat
    $conversation = \App\Models\Conversation::whereHas('participants', fn($q) => $q->where('user_id', $user->id))
        ->whereHas('participants', fn($q) => $q->where('user_id', $otherUserId))
        ->withCount('participants')
        ->get()
        ->filter(fn($c) => $c->participants_count === 2)
        ->first();

    if (!$conversation) {
        // Ako ne postoji, napravi novu
        $conversation = \App\Models\Conversation::create([
            'created_by' => $user->id,
        ]);

        $conversation->participants()->attach([$user->id, $otherUserId]);
    }

    // ✅ Dodaj "title" ručno
    $conversation->load('participants');

    $conversation->title = $conversation->participants
        ->where('id', '!=', $user->id)
        ->first()?->email ?? 'Nepoznat korisnik';

    return response()->json($conversation);
}



}
