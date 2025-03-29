<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'conversation_user', 'user_id', 'conversation_id');
    }
    

    //
    protected $fillable = [
        'name', 'email', 'password', 'role'
    ];

    public function isAdmin() {
        return $this->role === 'admin';
    }
    
    public function isModerator() {
        return $this->role === 'moderator';
    }
    
    public function isUser() {
        return $this->role === 'user';
    }
}
