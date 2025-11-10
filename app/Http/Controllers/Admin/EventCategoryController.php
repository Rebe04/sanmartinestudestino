<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventCategoryResource;
use App\Models\EventCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EventCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/EventCategories/Index', [
            'eventCategories' => EventCategoryResource::collection(EventCategory::latest()->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/EventCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:event_categories,name',
            'description' => 'required|string',
        ]);

        EventCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('admin.event-categories.index')->with('success', 'Categoría de evento creada.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EventCategory $eventCategory)
    {
        return Inertia::render('Admin/EventCategories/Edit', [
            'eventCategory' => new EventCategoryResource($eventCategory),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EventCategory $eventCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('event_categories')->ignore($eventCategory->id)],
            'description' => 'required|string',
        ]);

        $eventCategory->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('admin.event-categories.index')->with('success', 'Categoría de evento actualizada.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventCategory $eventCategory)
    {
        if ($eventCategory->event()->count() > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar una categoría con eventos asociados.');
        }
        $eventCategory->delete();
        return redirect()->route('admin.event-categories.index')->with('success', 'Categoría de evento eliminada.');
    }
}
