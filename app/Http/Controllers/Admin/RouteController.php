<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RouteResource;
use App\Models\Place;
use App\Models\Restaurant;
use App\Models\Hotel;
use App\Models\Event;
use App\Models\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $routes = Route::query()
            ->with('image')
            ->withCount(['places', 'restaurants', 'hotels', 'events'])
            ->latest('id')
            ->paginate(10);

        return Inertia::render('Admin/Routes/Index', [
            'routes' => RouteResource::collection($routes),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $places = Place::select('id', 'name')->orderBy('name')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->name, 'type' => Place::class]);
        $restaurants = Restaurant::select('id', 'name')->orderBy('name')->get()->map(fn($r) => ['value' => $r->id, 'label' => $r->name, 'type' => Restaurant::class]);
        $hotels = Hotel::select('id', 'name')->orderBy('name')->get()->map(fn($h) => ['value' => $h->id, 'label' => $h->name, 'type' => Hotel::class]);
        $events = Event::select('id', 'name')->orderBy('name')->get()->map(fn($e) => ['value' => $e->id, 'label' => $e->name, 'type' => Event::class]);

        $groupedOptions = [
            ['label' => 'Lugares', 'options' => $places],
            ['label' => 'Restaurantes', 'options' => $restaurants],
            ['label' => 'Hoteles', 'options' => $hotels],
            ['label' => 'Eventos', 'options' => $events],
        ];

        return Inertia::render('Admin/Routes/Create', [
            'routableOptions' => $groupedOptions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:routes,name',
            'time' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:webp|max:1024',
            'stops' => 'present|array|min:1',
            'stops.*.value' => 'required',
            'stops.*.label' => 'required|string',
            'stops.*.type' => 'required|string',
            'stops.*.description' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $validated) {
            $route = Route::create([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'time' => $validated['time'],
                'description' => $validated['description'],
            ]);

            // Guarda la imagen principal si se subió
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('routes', 'public');
                $route->image()->create(['url' => '/storage/' . $path]);
            }

            // Asocia las paradas usando la tabla polimórfica 'routables'
            foreach ($validated['stops'] as $index => $stop) {
                // Determina el nombre de la relación basado en el tipo
                $relationName = Str::plural(Str::snake(class_basename($stop['type'])));

                // Asegura que la relación exista en el modelo Route
                if (method_exists($route, $relationName)) {
                    $route->{$relationName}()->attach($stop['value'], [
                        'order' => $index + 1,
                        'description' => $stop['description'],
                    ]);
                }
            }
        });

        return redirect()->route('admin.routes.index')->with('success', 'Ruta creada exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Route $route)
    {
        $route->load('image');

        $places = $route->places()->orderBy('pivot_order')->get();
        $restaurants = $route->restaurants()->orderBy('pivot_order')->get();
        $hotels = $route->hotels()->orderBy('pivot_order')->get();
        $events = $route->events()->orderBy('pivot_order')->get();

        $allStops = collect([])->merge($places)->merge($restaurants)->merge($hotels)->merge($events);

        $sortedStops = $allStops->sortBy('pivot.order');

        // Obtiene todas las opciones disponibles para el selector
        $placesOptions = Place::select('id', 'name')->orderBy('name')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->name, 'type' => Place::class]);
        $restaurantsOptions = Restaurant::select('id', 'name')->orderBy('name')->get()->map(fn($r) => ['value' => $r->id, 'label' => $r->name, 'type' => Restaurant::class]);
        $hotelsOptions = Hotel::select('id', 'name')->orderBy('name')->get()->map(fn($h) => ['value' => $h->id, 'label' => $h->name, 'type' => Hotel::class]);
        $eventsOptions = Event::select('id', 'name')->orderBy('name')->get()->map(fn($e) => ['value' => $e->id, 'label' => $e->name, 'type' => Event::class]);

        $groupedOptions = [
            ['label' => 'Lugares', 'options' => $placesOptions],
            ['label' => 'Restaurantes', 'options' => $restaurantsOptions],
            ['label' => 'Hoteles', 'options' => $hotelsOptions],
            ['label' => 'Eventos', 'options' => $eventsOptions],
        ];

        $loadedStops = $sortedStops->values()->map(function ($stop) {
            $baseClassName = class_basename($stop);
            $modelClass = "App\\Models\\" . $baseClassName;
            return [
                'value' => $stop->id,
                'label' => $stop->name ?? 'Elemento no encontrado',
                'type' => $modelClass,
                'description' => $stop->pivot->description,
            ];
        });

        return Inertia::render('Admin/Routes/Edit', [
            'routeTurist' => (new RouteResource($route))->additional(['stops' => $loadedStops]),
            'routableOptions' => $groupedOptions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Route $route)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('routes')->ignore($route->id)],
            'time' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:webp|max:1024', // Nueva imagen opcional
            'image_delete' => 'nullable|boolean', // Flag para borrar imagen existente
            'stops' => 'present|array|min:1',
            'stops.*.value' => 'required',
            'stops.*.label' => 'required|string',
            'stops.*.type' => 'required|string',
            'stops.*.description' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $route, $validated) {
            // Actualiza los datos principales de la ruta
            $route->update([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'time' => $validated['time'],
                'description' => $validated['description'],
            ]);

            // Gestiona la imagen principal
            if ($request->boolean('image_delete') && $route->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $route->image->url));
                $route->image()->delete();
            }
            if ($request->hasFile('image')) {
                if ($route->image) { // Borra la anterior si existe
                    Storage::disk('public')->delete(str_replace('/storage/', '', $route->image->url));
                    $route->image()->delete();
                }
                $path = $request->file('image')->store('routes', 'public');
                $route->image()->create(['url' => '/storage/' . $path]);
            }

            DB::table('routables')->where('route_id', $route->id)->delete();

            foreach ($validated['stops'] as $index => $stop) {
                $modelClass = $stop['type'];
                if (class_exists($modelClass)) {
                    $item = $modelClass::find($stop['value']);
                    if ($item) {
                        // Usamos insert directo en la tabla pivote polimórfica
                        DB::table('routables')->insert([
                            'route_id' => $route->id,
                            'routable_id' => $item->id,
                            'routable_type' => $modelClass,
                            'order' => $index + 1,
                            'description' => $stop['description'],
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }
            }
        });

        return redirect()->route('admin.routes.index')->with('success', 'Ruta actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Route $route)
    {
        if ($route->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $route->image->url));
            $route->image()->delete();
        }
        $route->delete();

        return redirect()->route('admin.routes.index')->with('success', 'Ruta eliminada exitosamente.');
    }
}
