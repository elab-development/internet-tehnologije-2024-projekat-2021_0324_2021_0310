<?php

namespace App\Http\Controllers;

use App\Models\ReportedMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ModeratorController extends Controller
{
    public function reportedMessages(Request $request)
    {
        if ($request->user()->role !== 'moderator') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $reports = ReportedMessage::with([
            'message.user',     // Autor poruke
            'reporter',         // Ko je prijavio
        ])->latest()->get();

        return response()->json($reports);
    }

   
    public function suspendUser(Request $request, User $user) 
    {
        if ($request->user()->role !== 'moderator') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
    
        $now = Carbon::now('Europe/Belgrade');
    
        // Ako je još suspendovan – zabrani
        if ($user->suspended_until && Carbon::parse($user->suspended_until)->gt($now)) {
            return response()->json([
                'message' => 'Korisnik je već suspendovan do ' . $user->suspended_until,
            ], 400);
        }
    
        // Očisti prethodnu ako je istekla
        if ($user->suspended_until && Carbon::parse($user->suspended_until)->lte($now)) {
            $user->suspended_until = null;
            $user->save();
        }
    
        // Suspenduj sada
        $user->suspended_until = $now->copy()->addDay();
        $user->save();
    
        // ✅ Označi sve nerešene prijave kao rešene SA suspenzijom
        $reportedMessages = ReportedMessage::whereHas('message', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->where('resolved', false)->get();
    
        foreach ($reportedMessages as $report) {
            $report->resolved = true;
            $report->resolved_by_suspension = true; // <- ključna linija
            $report->save();
        }
    
        return response()->json([
            'message' => 'Korisnik je suspendovan na 24h.',
            'suspended_until' => $user->suspended_until,
        ]);
    }


    public function checkRole(Request $request)
    {
        if ($request->user()->role !== 'moderator') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user = Auth::user();

        if ($user && $user->role === 'moderator') {
            return response()->json(['is_moderator' => true]);
        }

        return response()->json(['is_moderator' => false], 403);
    }
    public function resolveReport(Request $request, ReportedMessage $report)
{
    if ($request->user()->role !== 'moderator') {
        return response()->json(['message' => 'Forbidden'], 403);
    }

    $report->resolved = true;
    $report->resolved_by_suspension = false; // ← važno za frontend prikaz
    $report->save();

    return response()->json(['message' => 'Prijava je označena kao rešena bez suspenzije.']);

}

}