<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        // Renderiza el componente Index.jsx y le pasa los eventos
        return Inertia::render('Events/Index', [
            'events' => Event::paginate(10)
        ]);
    }

    // Corresponde a la ruta GET /events/{event}
    public function show(Event $event)
    {
        // Renderiza el componente Show.jsx y le pasa el evento individual
        return Inertia::render('Events/Show', [
            'event' => $event
        ]);
    }
}
