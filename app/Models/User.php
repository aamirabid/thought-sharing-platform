<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //REQUESTED METHODS
    public static function signUp($payload)
    {
        $user = User::create([
            'full_name' => $payload->full_name,
            'email' => $payload->email,
            'password' => Hash::make($payload->password),
        ]);
        $token = $user->createToken('authToken')->plainTextToken;
        return [
            'accessToken' => 'Bearer ' . $token,
            'user' => $user,
        ];
    }
    public static function signIn($payload)
    {
        if (!Auth::attempt($payload->only(['email', 'password']))) {
            return response()->json([
                'message' => 'Email & Password does not match with our record.',
                'data' => null,
            ], 400);
        }
        $user = User::where('email', $payload->email)->firstOrFail();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['message' => 'success', 'data' => [
            'accessToken' => 'Bearer ' . $token,
            'user' => $user,
        ]], 200);
    }
    public static function signOut($payload)
    {
        return $payload->user()->currentAccessToken()->delete();
    }
}
