<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;

    //REQUESTED METHODS
    public static function createNote($payload){
        return 'stored';
    }
    public static function updateNote($id,$payload){
        return 'updated';
    }    
    public static function getNote($id){
        return 'note';
    }
    public static function getNotes(){
        return 'my-notes';
    }
    public static function getDashboardNotes($payload){
        if($payload->filterBy){
            return 'notes-by-filter:'.$payload->filterBy;
        }
        return 'dashboard-notes';
    }
    public static function removeNote($id){
        return 'removed';
    }
}
