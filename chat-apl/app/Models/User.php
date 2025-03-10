<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class);
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
