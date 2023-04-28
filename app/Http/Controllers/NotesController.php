<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Notes\CreateAndUpdateNotesRequest;
use App\Models\Notes;

class NotesController extends Controller
{
    /**
     * Display a listing of the notes.
     */
    public function index()
    {
        try {
            $response=Notes::getNotes();
            return response()->json(['message'=>'success','data'=>$response],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }

    /**
     * Store a newly created notes in storage.
     */
    public function store(CreateAndUpdateNotesRequest $request)
    {
        try {
            $response=Notes::createNote($request);
            return response()->json(['message'=>'success','data'=>$response],201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }

    /**
     * Display the specified note.
     */
    public function show(string $id)
    {
        try {
            $response=Notes::getNote($id);
            return response()->json(['message'=>'success','data'=>$response],201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }


    /**
     * Update the specified note in storage.
     */
    public function update(CreateAndUpdateNotesRequest $request, string $id)
    {
        try {
            $response=Notes::updateNote($id,$request);
            return response()->json(['message'=>'success','data'=>$response],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }

    /**
     * Remove the specified note from storage.
     */
    public function destroy(string $id)
    {
        try {
            $response=Notes::removeNote($id);
            return response()->json(['message'=>'success','data'=>$response],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }
}
