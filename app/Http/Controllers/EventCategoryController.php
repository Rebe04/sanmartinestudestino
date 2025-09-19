<?php

namespace App\Http\Controllers;

use App\Models\EventCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventCategoryController extends Controller
{
    public function index()
    {
        // Renderiza el componente Index.jsx y le pasa los eventos
        return Inertia::render('EventCategories/Index', [
            'event_categories' => EventCategory::all()
        ]);
    }

    // Corresponde a la ruta GET /events/{event}
    public function show(EventCategory $event_category)
    {
        // Renderiza el componente Show.jsx y le pasa el evento individual
        return Inertia::render('EventCategories/Show', [
            'event_category' => $event_category
        ]);
    }
}
