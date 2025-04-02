<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    // use HasFactory;

    protected $fillable = ['name', 'created_by'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // App\Models\Conversation.php

    public function participants()
    {
        return $this->belongsToMany(User::class, 'conversation_user', 'conversation_id', 'user_id');
    }
    

    
    public function users()
    {
        return $this->belongsToMany(User::class, 'conversation_user', 'conversation_id', 'user_id')
            ->withTimestamps(); // Automatski popunjava timestamps
    }
}
