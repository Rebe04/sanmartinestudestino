<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\subevent;
use Illuminate\Http\Request;

class SubeventController extends Controller
{
    public function index()
    {
        return subevent::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'date' => ['required', 'date'],
            'duration' => ['required'],
            'event_id' => ['required', 'integer'],
        ]);

        return subevent::create($data);
    }

    public function show(subevent $subevent)
    {
        return $subevent;
    }

    public function update(Request $request, subevent $subevent)
    {
        $data = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'date' => ['required', 'date'],
            'duration' => ['required'],
            'event_id' => ['required', 'integer'],
        ]);

        $subevent->update($data);

        return $subevent;
    }

    public function destroy(subevent $subevent)
    {
        $subevent->delete();

        return response()->json();
    }
}
