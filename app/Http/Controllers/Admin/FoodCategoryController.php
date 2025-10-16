<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoodCategoryResource;
use App\Models\FoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FoodCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/FoodCategories/Index', [
            'foodCategories' => FoodCategoryResource::collection(FoodCategory::latest()->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/FoodCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:food_categories,name',
            'description' => 'required|string',
        ]);

        FoodCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('admin.food-categories.index')->with('success', 'Categoría creada.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FoodCategory $foodCategory)
    {
        return Inertia::render('Admin/FoodCategories/Edit', [
            'food_category' => new FoodCategoryResource($foodCategory),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FoodCategory $foodCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:food_categories,name,' . $foodCategory->id,
            'description' => 'required|string',
        ]);
//        dd($foodCategory);

        $foodCategory->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('admin.food-categories.index')->with('success', 'Categoría actualizada.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FoodCategory $foodCategory)
    {
        if ($foodCategory->restaurant()->count() > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar una categoría con restaurantes asociados.');
        }
        $foodCategory->delete();
        return redirect()->route('admin.food-categories.index')->with('success', 'Categoría eliminada.');
    }
}
