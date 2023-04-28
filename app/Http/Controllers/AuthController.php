<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Requests\Auth\SigninRequest;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Sign up users.
     */
    public function signUp(SignupRequest $request)
    {
        try {
            $response=User::signUp($request);
            return response()->json(['message'=>'success','data'=>$response],201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }


    /**
     * Sign in users.
     */
    public function signIn(SigninRequest $request)
    {
        try {
            $response=User::signIn($request);
            return response()->json(['message'=>'success','data'=>$response],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }

    /**
     * Sign out users.
     */
    public function signOut(Request $request)
    {
        try {
            $response=User::signOut($request);
            return response()->json(['message'=>'success','data'=>$response],200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message'=>'exception','data'=>$th],400);
        }
    }

    
}
