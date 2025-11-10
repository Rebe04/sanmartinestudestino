<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventCategoryResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\TagResource;
use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Subevent;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with(['image', 'eventCategory'])->latest()->paginate(10);
        return Inertia::render('Admin/Events/Index', [
            'events' => EventResource::collection($events),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Events/Create', [
            'eventCategories' => EventCategoryResource::collection(EventCategory::all()),
            'tags' => TagResource::collection(Tag::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $this->validateEvent($request);

        DB::transaction(function () use ($request, $validatedData) {
            $event = Event::create([
                'name' => $validatedData['name'],
                'slug' => Str::slug($validatedData['name']),
                'description' => $validatedData['description'],
                'starts_at' => $validatedData['starts_at'],
                'finishes_at' => $validatedData['finishes_at'],
                'event_category_id' => $validatedData['event_category_id'],
            ]);

            // Imagen principal del Evento
            $path = $request->file('image')->store('events', 'public');
            $event->image()->create(['url' => '/storage/' . $path]);

            // Crear Subeventos
            if (isset($validatedData['subevents'])) {
                $this->syncSubevents($request, $event, $validatedData['subevents']);
            }
        });

        return redirect()->route('admin.events.index')->with('success', 'Evento y subeventos creados exitosamente.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        $event->load(['image', 'eventCategory', 'subevent.image', 'subevent.tags']);
        return Inertia::render('Admin/Events/Edit', [
            'event' => new EventResource($event),
            'eventCategories' => EventCategoryResource::collection(EventCategory::all()),
            'tags' => TagResource::collection(Tag::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validatedData = $this->validateEvent($request, $event);

        DB::transaction(function () use ($request, $event, $validatedData) {
            $event->update([
                'name' => $validatedData['name'],
                'slug' => Str::slug($validatedData['name']),
                'description' => $validatedData['description'],
                'starts_at' => $validatedData['starts_at'],
                'finishes_at' => $validatedData['finishes_at'],
                'event_category_id' => $validatedData['event_category_id'],
            ]);

            // Gestionar imagen principal
            if ($request->boolean('image_delete') && $event->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $event->image->url));
                $event->image()->delete();
            }
            if ($request->hasFile('image')) {
                if ($event->image) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $event->image->url));
                    $event->image()->delete();
                }
                $path = $request->file('image')->store('events', 'public');
                $event->image()->create(['url' => '/storage/' . $path]);
            }

            // Sincronizar Subeventos
            if (isset($validatedData['subevents'])) {
                $this->syncSubevents($request, $event, $validatedData['subevents']);
            }
        });

        return redirect()->route('admin.events.index')->with('success', 'Evento y subeventos actualizados.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        if ($event->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $event->image->url));
            $event->image()->delete();
        }
        // Borra subeventos e imágenes asociadas
        foreach ($event->subevent as $subevent) {
            if ($subevent->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $subevent->image->url));
                $subevent->image()->delete();
            }
            $subevent->delete(); // La FK con cascade también lo haría
        }
        $event->delete();
        return redirect()->route('admin.events.index')->with('success', 'Evento eliminado exitosamente.');
    }

    private function validateEvent(Request $request, Event $event = null)
    {
        $rules = [
            'name' => ['required', 'string', 'max:255', $event ? Rule::unique('events')->ignore($event->id) : 'unique:events,name'],
            'description' => 'required|string',
            'starts_at' => 'required|date',
            'finishes_at' => 'required|date|after_or_equal:starts_at',
            'event_category_id' => 'required|exists:event_categories,id',
            'image' => $event ? 'nullable|image|mimes:webp|max:1024' : 'required|image|mimes:webp|max:1024',
            'image_delete' => 'nullable|boolean',
            'subevents' => 'present|array',
            'subevents_to_delete' => 'nullable|array',
            'subevents_to_delete.*' => 'exists:subevents,id',
        ];

        foreach ($request->input('subevents', []) as $index => $subevent) {
            $rules["subevents.{$index}.id"] = 'nullable|exists:subevents,id';
            $rules["subevents.{$index}.name"] = 'required|string|max:255';
            $rules["subevents.{$index}.description"] = 'required|string';
            $rules["subevents.{$index}.date"] = 'required|date';
            $rules["subevents.{$index}.duration"] = 'required|string';
            $rules["subevents.{$index}.tags"] = 'present|array';
            if ($request->hasFile("subevents.{$index}.image")) {
                $rules["subevents.{$index}.image"] = 'required|image|mimes:webp|max:1024';
            }
        }

        return $request->validate($rules);
    }

    private function syncSubevents(Request $request, Event $event, array $subeventsData)
    {
        // Borra los subeventos marcados para eliminar
        if ($request->has('subevents_to_delete')) {
            Subevent::whereIn('id', $request->subevents_to_delete)->get()->each(function ($subevent) {
                if ($subevent->image) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $subevent->image->url));
                    $subevent->image()->delete();
                }
                $subevent->delete();
            });
        }

        foreach ($subeventsData as $index => $subeventData) {
            $subevent = Subevent::updateOrCreate(
                ['id' => $subeventData['id'] ?? null],
                [
                    'event_id' => $event->id,
                    'name' => $subeventData['name'],
                    'description' => $subeventData['description'],
                    'date' => $subeventData['date'],
                    'duration' => $subeventData['duration'],
                ]
            );

            // Gestionar imagen del subevento
            if ($request->hasFile("subevents.$index.image")) {
                if ($subevent->image) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $subevent->image->url));
                    $subevent->image()->delete();
                }
                $path = $request->file("subevents.$index.image")->store('subevents', 'public');
                $subevent->image()->create(['url' => '/storage/' . $path]);
            }

            // Sincronizar Tags (con creación "sobre la marcha")
            $tagIds = [];
            foreach ($subeventData['tags'] as $tagValue) {
                if (is_numeric($tagValue)) {
                    $tagIds[] = $tagValue;
                } else {
                    $newTag = Tag::firstOrCreate(
                        ['name' => $tagValue],
                        ['slug' => Str::slug($tagValue), 'color' => '#f6c132']
                    );
                    $tagIds[] = $newTag->id;
                }
            }
            $subevent->tags()->sync($tagIds);
        }
    }
}
