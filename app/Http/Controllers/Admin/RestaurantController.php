<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoodCategoryResource;
use App\Http\Resources\RestaurantResource;
use App\Models\Dish;
use App\Models\FoodCategory;
use App\Models\Image;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $foodCategories = FoodCategory::all();
        $restaurants = Restaurant::query()
            ->when($request->query('food_category'), function ($query, $foodCategory) {
                return $query->where('food_category_id', $foodCategory);
            })
            ->with(['image', 'foodCategory'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Restaurants/Index', [
            'restaurants' => RestaurantResource::collection($restaurants),
            'foodCategories' => FoodCategoryResource::collection($foodCategories),
            'filters' => $request->only(['food_category']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Restaurants/Create', [
            'foodCategories' => FoodCategoryResource::collection(FoodCategory::all()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:restaurants,name',
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'food_category_id' => 'required|exists:food_categories,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:webp|max:1024',
            'dishes' => 'present|array',
            'dishes.*.name' => 'required|string|max:255',
            'dishes.*.image' => 'required|image|mimes:webp|max:1024',
        ]);

        DB::transaction(function () use ($request, $validatedData) {
            $restaurant = Restaurant::create([
                'name' => $validatedData['name'], 'slug' => Str::slug($validatedData['name']),
                'address' => $validatedData['address'], 'description' => $validatedData['description'],
                'food_category_id' => $validatedData['food_category_id'],
            ]);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $path = $file->store('restaurants', 'public');
                    $restaurant->images()->create(['url' => '/storage/' . $path]);
                }
            }

            if (isset($validatedData['dishes'])) {
                foreach ($validatedData['dishes'] as $index => $dishData) {
                    $dishImageFile = $request->file("dishes.$index.image");
                    if ($dishImageFile) {
                        $path = $dishImageFile->store('dishes', 'public');
                        $dish = $restaurant->dishes()->create(['name' => $dishData['name']]);
                        $dish->image()->create(['url' => '/storage/' . $path]);
                    }
                }
            }
        });

        return redirect()->route('admin.restaurants.index')->with('success', 'Restaurante creado exitosamente.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        $restaurant->load('foodCategory', 'dishes.image', 'images');

        $allFoodCategories = FoodCategory::all();

        return Inertia::render('Admin/Restaurants/Edit', [
            'restaurant' => new RestaurantResource($restaurant),
            'foodCategories' => FoodCategoryResource::collection($allFoodCategories),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $rules = [
            'name' => ['required', 'string', 'max:255', Rule::unique('restaurants')->ignore($restaurant->id)],
            'address' => 'required|string|max:255',
            'description' => 'required|string',
            'food_category_id' => 'required|exists:food_categories,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:webp|max:1024',
            'images_to_delete' => 'nullable|array',
            'images_to_delete.*' => 'exists:images,id',
            'dishes' => 'present|array',
            'dishes_to_delete' => 'nullable|array',
            'dishes_to_delete.*' => 'exists:dishes,id',
        ];

        foreach ($request->input('dishes', []) as $index => $dish) {
            $rules["dishes.{$index}.id"] = 'nullable|exists:dishes,id';
            $rules["dishes.{$index}.name"] = 'required|string|max:255';
            if ($request->hasFile("dishes.{$index}.image")) {
                $rules["dishes.{$index}.image"] = 'image|mimes:webp|max:1024';
            }
        }
        $validatedData = $request->validate($rules);

        DB::transaction(function () use ($request, $restaurant, $validatedData) {
            $restaurant->update($request->except(['dishes', 'dishes_to_delete', 'images', 'images_to_delete']));
            $restaurant->update(['slug' => Str::slug($request->name)]);

            // Galería del Restaurante
            if ($request->has('images_to_delete')) {
                Image::whereIn('id', $request->images_to_delete)->get()->each(function ($image) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $image->url));
                    $image->delete();
                });
            }
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $path = $file->store('restaurants', 'public');
                    $restaurant->images()->create(['url' => '/storage/' . $path]);
                }
            }

            // Platos Destacados
            if ($request->has('dishes_to_delete')) {
                Dish::whereIn('id', $request->dishes_to_delete)->get()->each(function ($dish) {
                    if ($dish->image) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $dish->image->url));
                        $dish->image()->delete();
                    }
                    $dish->delete();
                });
            }
            if (isset($validatedData['dishes'])) {
                foreach ($validatedData['dishes'] as $index => $dishData) {
                    $dish = isset($dishData['id']) ? Dish::find($dishData['id']) : null;
                    if ($dish) {
                        $dish->update(['name' => $dishData['name']]);
                    } else {
                        $dish = $restaurant->dishes()->create(['name' => $dishData['name']]);
                    }
                    if ($request->hasFile("dishes.$index.image")) {
                        if ($dish->image) {
                            Storage::disk('public')->delete(str_replace('/storage/', '', $dish->image->url));
                            $dish->image()->delete();
                        }
                        $path = $request->file("dishes.$index.image")->store('dishes', 'public');
                        $dish->image()->create(['url' => '/storage/' . $path]);
                    }
                }
            }
        });

        return redirect()->route('admin.restaurants.index')->with('success', 'Restaurante actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        foreach ($restaurant->dishes as $dish) {
            if ($dish->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $dish->image->url));
                $dish->image()->delete();
            }
            $dish->delete();
        }
        $restaurant->delete();
        return redirect()->route('admin.restaurants.index')->with('success', 'Restaurante eliminado exitosamente.');
    }
}
