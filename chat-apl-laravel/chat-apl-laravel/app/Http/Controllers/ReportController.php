<?php

namespace App\Http\Controllers;

use App\Models\User;
use Config;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    //funkcija u kom user prijavljuje
    public function reportUser(Request $request, User $user) {
        
    }
    public function getReportReasons() {
        return response()->json([
            'reasons' => Config::get('reports.reasons')
        ]);
    }
}
