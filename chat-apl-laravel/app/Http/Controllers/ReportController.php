<?php

namespace App\Http\Controllers;

use App\Models\User;
use Config;
use Illuminate\Http\Request;

class ReportController extends Controller
{ 
     // Funkcija za prijavu poruke
    public function reportMessage(Request $request, Message $message)
    {
        $request->validate([
            'reason' => 'required|string|in:' . implode(',', Config::get('reports.reasons')),  // Validacija razloga
        ]);

        // Ažuriranje poruke sa prijavom
        $message->update([
            'reported' => true,
            'report_reason' => $request->reason,
        ]);

        return response()->json([
            'message' => 'Poruka je uspešno prijavljena.',
        ]);
    }

    // Funkcija za dobijanje razloga prijave
    public function getReportReasons()
    {
        return response()->json([
            'reasons' => Config::get('reports.reasons')  // Vraća razloge prijave iz config/reports.php
        ]);
    }
}
