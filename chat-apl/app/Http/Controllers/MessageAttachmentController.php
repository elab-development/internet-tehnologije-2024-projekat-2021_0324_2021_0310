<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageAttachmentController extends Controller
{
    public function store(Request $request, Message $message) {
        $attachment = $message->attachments()->create($request->all());
        return response()->json($attachment, 201);
    }
}
