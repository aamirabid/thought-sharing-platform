<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notes;
use App\Models\Tags;

class DashboardController extends Controller
{
    /**
     * Display a listing of the tags.
     */
    public function tags()
    {
        try {
            $response = Tags::getTags();
            return response()->json(['message' => 'success', 'data' => $response], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'exception', 'data' => $e->getMessage()], 400);
        }
    }
    /**
     * Display a listing of the notes with filterBy tags.
     */
    public function notes(Request $request)
    {
        try {
            $response = Notes::getDashboardNotes($request);
            return response()->json(['message' => 'success', 'data' => $response], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'exception', 'data' => $e->getMessage()], 400);
        }
    }
}
