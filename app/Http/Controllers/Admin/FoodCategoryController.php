<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FoodCategory;
use Illuminate\Http\Request;

class FoodCategoryController extends Controller
{
    public function index()
    {
        return FoodCategory::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);

        return FoodCategory::create($data);
    }

    public function show(FoodCategory $foodCategory)
    {
        return $foodCategory;
    }

    public function update(Request $request, FoodCategory $foodCategory)
    {
        $data = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);

        $foodCategory->update($data);

        return $foodCategory;
    }

    public function destroy(FoodCategory $foodCategory)
    {
        $foodCategory->delete();

        return response()->json();
    }
}
