<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceCategoryResource;
use App\Models\PlaceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PlaceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/PlaceCategories/Index', [
            'placeCategories' => PlaceCategoryResource::collection(PlaceCategory::latest()->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PlaceCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:place_categories,name',
        ]);

        PlaceCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return redirect()->route('admin.place-categories.index')->with('success', 'Categoría creada exitosamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PlaceCategory $placeCategory)
    {
        return Inertia::render('Admin/PlaceCategories/Edit', [
            'placeCategory' => new PlaceCategoryResource($placeCategory),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PlaceCategory $placeCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('place_categories')->ignore($placeCategory->id)],
        ]);

        $placeCategory->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
        ]);

        return redirect()->route('admin.place-categories.index')->with('success', 'Categoría actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PlaceCategory $placeCategory)
    {
        if ($placeCategory->place()->count() > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar una categoría con lugares asociados.');
        }
        $placeCategory->delete();
        return redirect()->route('admin.place-categories.index')->with('success', 'Categoría eliminada exitosamente.');
    }
}
