<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Notes extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'body',
        'is_published',
    ];

    protected $hidden = [
        'user_id'
    ];

    //RELATIONS
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tags::class, 'note_tags', 'note_id', 'tag_id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id',);
    }

    //REQUESTED METHODS
    public static function createNote($payload)
    {
        $note = Notes::create([
            'user_id' => $payload->user()->id,
            'slug' => Notes::createSlug($payload->title),
            'title' => $payload->title,
            'body' => $payload->body,
            'is_published' => $payload->is_published ==='0' ? 0 : 1
        ]);
        foreach ($payload->tags[0] as $tag) {
            $findTag = Tags::firstOrCreate(['tag' => $tag]);
            NoteTags::updateOrCreate(['tag_id' => $findTag->id, 'note_id' => $note->id]);
        }
        return Notes::with('tags')->where('id', $note->id)->first();
    }
    public static function updateNote($id, $payload)
    {
        $note = Notes::where(['user_id'=>$payload->user()->id,'slug'=> $id])->firstOrFail();
        $note->title=$payload->title;
        $note->body=$payload->body;
        $note->is_published=$payload->is_published =='0' ? 0 : 1;
        $note->save();
        foreach ($payload->tags[0] as $tag) {
            $findTag = Tags::firstOrCreate(['tag' => $tag]);
            NoteTags::updateOrCreate(['tag_id' => $findTag->id, 'note_id' => $note->id]);
        }
        return Notes::with('tags')->where('id', $note->id)->first();
        
        return null;
    }
    public static function getNote($id,$payload)
    {
        return Notes::with('tags')->where(['user_id'=>$payload->user()->id,'slug'=> $id])->first();
    }
    public static function getNotes($payload)
    {
        return Notes::with('tags')->where('user_id', $payload->user()->id)->simplePaginate(10);
    }
    public static function getDashboardNotes($payload)
    {
        $query=Notes::with(['tags', 'user'])->where('is_published', 1);
        if ($payload->filterBy) {   
            $query->whereHas('tags',function($results) use ($payload){
                $results->whereIn('tag',[$payload->filterBy]);
                return $results;
            });
        }
        return $query->orderBy('created_at', 'DESC')->simplePaginate(9);
    }
    public static function removeNote($id,$payload)
    {
        return Notes::where(['user_id'=>$payload->user()->id,'slug'=> $id])->delete();
    }

    //HELPER
    public static function createSlug($str, $delimiter = '-')
    {
        return strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));
    }
}
