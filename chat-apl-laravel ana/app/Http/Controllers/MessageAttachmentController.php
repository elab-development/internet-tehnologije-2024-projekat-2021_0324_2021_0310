<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MessageAttachment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Storage;

class MessageAttachmentController extends Controller
{
    public function store(Request $request, Message $message): JsonResponse {
        $request->validate([
            'file' => 'required|file|max:40960|mimes:jpg,jpeg,png,pdf,doc,docx,xlsx',
        ]);

        $path = $request->file('file')->store('attachments', 'public');

        $attachment = $message->attachments()->create([
            'file_path' => $path,
            'file_type' => $request->file('file')->getClientMimeType(),
        ]);

        return response()->json([
            'message' => 'Fajl uspesno otpremljen',
            'attachment' => $attachment
        ], 201);
    }

    public function download($id): JsonResponse {
        $attachment = MessageAttachment::findOrFail($id);

        if (!Storage::disk('public')->exists($attachment->file_path)) {
            return response()->json(['error' => 'Fajl nije pronadjen'], 404);
        }

        return response()->json([
            'message' => 'Download link generated',
            'download_url' => asset('storage/' . $attachment->file_path)
        ], 200);
    }


}
