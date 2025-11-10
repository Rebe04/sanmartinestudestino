<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceCategoryResource;
use App\Http\Resources\PlaceResource;
use App\Models\Image;
use App\Models\Place;
use App\Models\PlaceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $placeCategories = PlaceCategory::orderBy('name')->get();

        $places = Place::query()
            ->when($request->query('place_category_id'), function ($query, $placeCategoryId) {
                return $query->where('place_category_id', $placeCategoryId);
            })
            ->with(['image', 'placeCategory'])
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Places/Index', [
            'places' => PlaceResource::collection($places),
            'placeCategories' => PlaceCategoryResource::collection($placeCategories),
            'filters' => $request->only(['place_category_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Places/Create', [
            'placeCategories' => PlaceCategoryResource::collection(PlaceCategory::orderBy('name')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:places,name',
            'place_category_id' => 'required|exists:place_categories,id',
            'address' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'description' => 'required|string',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:webp|max:1024',
        ]);

        DB::transaction(function () use ($request, $validatedData) {
            $place = Place::create([
                'name' => $validatedData['name'],
                'slug' => Str::slug($validatedData['name']),
                'place_category_id' => $validatedData['place_category_id'],
                'address' => $validatedData['address'],
                'price' => $validatedData['price'],
                'description' => $validatedData['description'],
                'instagram' => $validatedData['instagram'],
                'facebook' => $validatedData['facebook'],
                'youtube' => $validatedData['youtube'],
                'phone' => $validatedData['phone'],
                'email' => $validatedData['email'],
            ]);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $path = $file->store('places', 'public');
                    $place->images()->create(['url' => '/storage/' . $path]);
                }
            }
        });

        return redirect()->route('admin.places.index')->with('success', 'Lugar creado exitosamente.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Place $place)
    {
        $place->load(['placeCategory', 'images']);
        return Inertia::render('Admin/Places/Edit', [
            'place' => new PlaceResource($place),
            'placeCategories' => PlaceCategoryResource::collection(PlaceCategory::orderBy('name')->get()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('places')->ignore($place->id)],
            'place_category_id' => 'required|exists:place_categories,id',
            'address' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'description' => 'required|string',
            'instagram' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'youtube' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:webp|max:1024',
            'images_to_delete' => 'nullable|array',
            'images_to_delete.*' => 'exists:images,id',
        ]);

        DB::transaction(function () use ($request, $place, $validatedData) {
            $place->update([
                'name' => $validatedData['name'],
                'slug' => Str::slug($validatedData['name']),
                'place_category_id' => $validatedData['place_category_id'],
                'address' => $validatedData['address'],
                'price' => $validatedData['price'],
                'description' => $validatedData['description'],
                'instagram' => $validatedData['instagram'],
                'facebook' => $validatedData['facebook'],
                'youtube' => $validatedData['youtube'],
                'phone' => $validatedData['phone'],
                'email' => $validatedData['email'],
            ]);

            if ($request->has('images_to_delete')) {
                Image::whereIn('id', $request->images_to_delete)
                    ->where('imageable_id', $place->id)
                    ->where('imageable_type', Place::class)
                    ->get()
                    ->each(function ($image) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));
                        $image->delete();
                    });
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $path = $file->store('places', 'public');
                    $place->images()->create(['url' => '/storage/' . $path]);
                }
            }
        });

        return redirect()->route('admin.places.index')->with('success', 'Lugar actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        foreach ($place->images as $image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));
            $image->delete();
        }
        $place->delete();
        return redirect()->route('admin.places.index')->with('success', 'Lugar eliminado exitosamente.');
    }
}
