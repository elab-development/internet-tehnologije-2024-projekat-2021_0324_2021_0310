<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    // use HasFactory;

    protected $fillable = ['user_id', 'conversation_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
    public function attachments()//vise fajlova jedna poruka moze da ima
    {
        return $this->hasMany(MessageAttachment::class);
    }   
}
