<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Korisnik uspešno registrovan!',
            'user' => $user,
            'token' => $token
        ]);
    }
    

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    // Pronalazak korisnika u bazi
    $user = User::where('email', $request->email)->first();

    // Provera da li korisnik postoji i da li se lozinka poklapa
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Neispravan email ili lozinka'], 401);
    }

    // Generisanje API tokena (Sanctum)
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Uspešno prijavljen',
        'token' => $token,
        'user' => $user
    ], 200);
}

    public function logout(Request $request) {
           $user = $request->user();

        if ($user) {
            // Briše samo trenutni token korisnika
            $user->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Uspešno ste se odjavili!'
            ], 200);
        }

        return response()->json([
            'message' => 'Neautorizovan korisnik!'
        ], 401);    
    }

    public function forgotPassword(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
        'g-recaptcha-response' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Verifikacija Google reCAPTCHA
    $client = new Client();
    $response = $client->post('https://www.google.com/recaptcha/api/siteverify', [
        'form_params' => [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $request->input('g-recaptcha-response')
        ]
    ]);

    $body = json_decode((string) $response->getBody(), true);

    if (!$body['success']) {
        return response()->json(['error' => 'CAPTCHA verifikacija nije uspela.'], 422);
    }

    // Promena lozinke ako CAPTCHA uspe
    $user = User::where('email', $request->email)->first();
    if (!$user) {
        return response()->json(['error' => 'Korisnik nije pronađen.'], 404);
    }

    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json(['message' => 'Lozinka uspešno promenjena.']);
}   
public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return response()->json(['error' => 'Korisnik nije pronađen.'], 404);
        }
    
        $user->password = Hash::make($request->password);
        $user->save();
    
        return response()->json(['message' => 'Lozinka uspešno promenjena.']);
    }
}
