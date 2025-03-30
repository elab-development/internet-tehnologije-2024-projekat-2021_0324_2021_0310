<?php
namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\ReportedMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class ReportController extends Controller
{
    public function reportMessage(Request $request, Message $message)
    {
        $reasons = array_keys(Config::get('reports.reasons'));

        $validated = $request->validate([
            'reason' => 'required|string|in:' . implode(',', $reasons),
            'details' => 'nullable|string|max:1000',
        ]);

        // Provera da li je korisnik već prijavio poruku
        if (ReportedMessage::where('message_id', $message->id)
            ->where('reported_by', auth()->id())
            ->exists()) {
            return response()->json(['message' => 'Već ste prijavili ovu poruku.'], 409);
        }

        ReportedMessage::create([
            'message_id' => $message->id,
            'reported_by' => auth()->id(),
            'reason' => $validated['reason'],
            'details' => $validated['details'] ?? null,
        ]);

        return response()->json(['message' => 'Poruka je uspešno prijavljena.']);
    }

    public function getReportReasons()
    {
        return response()->json([
            'reasons' => Config::get('reports.reasons')
        ]);
    }
}
