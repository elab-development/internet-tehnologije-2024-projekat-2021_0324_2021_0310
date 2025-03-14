<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{

    public function index(Request $request)
    {
        return response()->json($request->user()->conversations);

    }

    public function store(Request $request)
    {
        // Validacija
        $request->validate([
            'name' => 'nullable|string', // Naziv konverzacije može biti null
            'users' => 'required|array|min:2', // Mora biti najmanje 2 korisnika
            'users.*' => 'exists:users,id' // Svaki korisnik mora postojati u bazi
        ]);

        // Kreiranje konverzacije
        $conversation = Conversation::create([
            'name' => $request->name,
            'created_by' => auth()->id() // Ili $request->user()->id
        ]);

        // Dodavanje korisnika u konverzaciju (u pivot tabelu `conversation_user`)
        $conversation->users()->attach($request->users);

        return response()->json($conversation->load('users'), 201);
    }

    public function destroy(Conversation $conversation)
    {
        $conversation->delete();
        return response()->json(['message' => 'Conversation deleted successfully'], 200);
    }


    public function searchConversations(Request $request)
    {
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
