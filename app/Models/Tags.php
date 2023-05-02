<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tags extends Model
{
    use HasFactory;
    protected $fillable = [
        'tag',
    ];
    protected $hidden = [
        'id'
    ];

    //RELATIONS
    public function notes(): BelongsToMany
    {
        return $this->belongsToMany(Notes::class, 'NoteTags', 'tag_id', 'note_id');
    }
    //REQUESTED METHODS
    public static function getTags()
    {
        return Tags::simplePaginate(8);
    }

}