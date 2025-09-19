<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'starts_at' => ['required', 'date'],
            'finishes_at' => ['required', 'date'],
        ]);

        return Event::create($data);
    }

    public function show(Event $event)
    {
        return $event;
    }

    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'starts_at' => ['required', 'date'],
            'finishes_at' => ['required', 'date'],
        ]);

        $event->update($data);

        return $event;
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json();
    }
}
