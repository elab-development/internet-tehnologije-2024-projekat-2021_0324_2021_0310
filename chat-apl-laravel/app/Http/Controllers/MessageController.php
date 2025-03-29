<?php
namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\MessageAttachment;
use Broadcast;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Attachment;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
    public function getMessages(Conversation $conversation) {
        $messages = $conversation->messages()
        ->select('id', 'content', 'user_id', 'created_at') // biramo samo potrebne kolone
        ->orderBy('created_at')
        ->get();

    return response()->json($messages);
    }

    public function store(Request $request, Conversation $conversation) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'nullable|string',
            'attachments.*' => 'file|max:2048',
        ]);
    
        $message = $conversation->messages()->create([
            'user_id' => $request->user_id,
            'content' => $request->content ?? '',
        ]);
    
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('attachments', 'public');
                $message->attachments()->create([
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }
    
        // Emituj poruku SVIMA uključujući pošiljaoca
        event(new \App\Events\MessageSent($message));
    
        return response()->json($message->load('attachments', 'user'), 201);
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
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'conversation_id' => 'required|exists:conversations,id',
            'content' => 'nullable|string',
            'attachments.*' => 'file|max:2048', // maksimalno 2MB po fajlu
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Kreiranje poruke
        $message = Message::create([
            'user_id' => $request->user_id,
            'conversation_id' => $request->conversation_id,
            'content' => $request->content ?? '',
        ]);
    
        // Snimi fajlove ako ih ima
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
    
        // Vrati poruku zajedno sa pošiljaocem i prilozima
        return response()->json([
            'message' => 'Poruka poslata',
            'data' => $message->load(['attachments', 'user:id,email,name']) // za prikaz pošiljaoca u Reactu
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