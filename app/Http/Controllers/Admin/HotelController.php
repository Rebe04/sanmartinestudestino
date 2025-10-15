<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AmenityResource;
use App\Http\Resources\HotelResource;
use App\Models\Amenity;
use App\Models\Hotel;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hotels = Hotel::with('image')->latest()->paginate(10);
        return Inertia::render('Admin/Hotels/Index', [
            'hotels' => HotelResource::collection($hotels),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $amenities = Amenity::all();
        return Inertia::render('Admin/Hotels/Create', [
            'amenities' => AmenityResource::collection($amenities),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:hotels,name',
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'price_range' => 'required|string|max:50',
            'instagram' => 'nullable|url',
            'facebook' => 'nullable|url',
            'youtube' => 'nullable|url',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'web' => 'nullable|url',
            'amenities' => 'nullable|array',
//            'amenities.*' => 'exists:amenities,id',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:webp|max:1024',
        ]);

        $hotel = Hotel::create([
            'name' => $validatedData['name'],
            'slug' => Str::slug($validatedData['name']),
            'address' => $validatedData['address'],
            'description' => $validatedData['description'],
            'price_range' => $validatedData['price_range'],
            'instagram' => $validatedData['instagram'],
            'facebook' => $validatedData['facebook'],
            'youtube' => $validatedData['youtube'],
            'phone' => $validatedData['phone'],
            'email' => $validatedData['email'],
            'web' => $validatedData['web'],
        ]);

        // Asocia las amenities seleccionadas
        $amenityIds = [];
        if ($request->has('amenities')) {
            foreach ($request->amenities as $amenity) {
                if (is_numeric($amenity)) {
                    // Si es un número, es un ID existente
                    $amenityIds[] = $amenity;
                } else {
                    // Si es un string, es una nueva Amenity
                    $newAmenity = Amenity::firstOrCreate(
                        ['name' => $amenity],
                        // Le asignamos un ícono por defecto. Debes tener este SVG en tu carpeta public/icons.
                        ['icon' => 'QuestionMarkCircleIcon']
                    );
                    $amenityIds[] = $newAmenity->id;
                }
            }
        }
        $hotel->amenities()->attach($amenityIds);

        // Sube y asocia las imágenes
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('hotels', 'public');
                $hotel->images()->create(['url' => '/storage/' . $path]);
            }
        }

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel creado exitosamente.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hotel $hotel)
    {
        $hotel->load('amenities', 'images');
        $amenities = Amenity::all();

        return Inertia::render('Admin/Hotels/Edit', [
            'hotel' => new HotelResource($hotel),
            'amenities' => AmenityResource::collection($amenities),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hotel $hotel)
    {

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('hotels')->ignore($hotel->id)],
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'price_range' => 'required|string|max:50',
            'instagram' => 'nullable|url',
            'facebook' => 'nullable|url',
            'youtube' => 'nullable|url',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'web' => 'nullable|url',
            'amenities' => 'nullable|array',
//            'amenities.*' => 'exists:amenities,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:webp|max:1024',
            'images_to_delete' => 'nullable|array',
            'images_to_delete.*' => 'exists:images,id',
        ]);

        // Actualiza los datos principales del hotel
        $hotel->update($request->except(['amenities', 'images', 'images_to_delete']));
        $hotel->update(['slug' => Str::slug($request->name)]);

        // Sincroniza las amenities: quita las que no están y añade las nuevas
        $amenityIds = [];
        if ($request->has('amenities')) {
            foreach ($request->amenities as $amenityValue) {
                if (is_numeric($amenityValue)) {
                    $amenityIds[] = $amenityValue;
                } else {
                    $newAmenity = Amenity::firstOrCreate(
                        ['name' => $amenityValue],
                        ['icon' => 'QuestionMarkCircleIcon']
                    );
                    $amenityIds[] = $newAmenity->id;
                }
            }
        }

        $hotel->amenities()->sync($amenityIds);

        // Borra las imágenes seleccionadas
        if ($request->has('images_to_delete')) {
            foreach ($request->images_to_delete as $imageId) {
                $image = Image::find($imageId);
                if ($image) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));
                    $image->delete();
                }
            }
        }

        // Sube las nuevas imágenes
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('hotels', 'public');
                $hotel->images()->create(['url' => '/storage/' . $path]);
            }
        }

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        // Borra las imágenes asociadas del disco y la BD
        foreach ($hotel->images as $image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));
            $image->delete();
        }

        $hotel->delete();

        return redirect()->route('admin.hotels.index')->with('success', 'Hotel eliminado exitosamente.');
    }
}
