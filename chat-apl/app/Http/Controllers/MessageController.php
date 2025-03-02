<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Attachment;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function getMessages(Conversation $conversation) {
        return response()->json($conversation->messages);
    }

    public function store(Request $request, Conversation $conversation) {
        $message = $conversation->messages()->create($request->all());

        
        Broadcast::event(new \App\Events\MessageSent($message));

        return response()->json($message, 201);
    }

    /*public function update(Request $request, Message $message) {
        $message->update($request->all());
        return response()->json($message, 200);
    }*/
    public function destroy(Message $message) {
        $message->delete();
        return response()->json(['message' => 'Poruka obrisana uspesno'], 200);
    }
 


    
    public function sendMessageWithAttachment(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'conversation_id' => 'required|exists:conversations,id',
            'content' => 'nullable|string',
            'attachments.*' => 'file|max:2048', // Ograničenje na 2MB po fajlu
        ]);

        $message = Message::create([
            'user_id' => $request->user_id,
            'conversation_id' => $request->conversation_id,
            'content' => $request->content ?? '',
        ]);
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('attachments', 'public');
                MessageAttachment::create([
                    'message_id' => $message->id,
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }

        return response()->json([
            'message' => 'Poruka poslata',
            'data' => $message->load('attachments')
        ], 201);
    }


    public function searchMessages(Request $request) {
        $query = Message::query();

        if ($request->has('content')) {
            $query->where('content', 'LIKE', '%' . $request->content . '%');
        }
        if ($request->has('user_id')) {
            $query->where('user_id', $request->user_id);
        }
        if ($request->has('conversation_id')) {
            $query->where('conversation_id', $request->conversation_id);
        }

        return response()->json($query->get());
    }



}