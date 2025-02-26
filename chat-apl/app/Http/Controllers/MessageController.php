<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Attachment;
use Illuminate\Http\JsonResponse;

class MessageController extends Controller
{
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
                Attachment::create([
                    'message_id' => $message->id,
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }

        return response()->json([
            'message' => 'Poruka poslata!',
            'data' => $message->load('attachments')
        ], 201);
    }
}