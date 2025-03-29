<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        // Učitaj korisnika i priloge uz poruku
        $this->message = $message->load('user', 'attachments');
    }

    public function broadcastOn()
    {
        // Emitujemo poruku na privatni kanal za određenu konverzaciju
        return new PrivateChannel('chat.' . $this->message->conversation_id);
    }

    public function broadcastAs()
    {
        // Ime eventa koje se sluša na frontendu
        return 'MessageSent';
    }
}
