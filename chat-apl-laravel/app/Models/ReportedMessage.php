<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReportedMessage extends Model
{
 
    protected $fillable = ['message_id', 'reported_by', 'reason', 'details'];

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }
    
}
