<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteTags extends Model
{
    use HasFactory;
    protected $fillable = [
        'note_id',
        'tag_id',
    ];

    protected $hidden = [
        'id'
    ];
}