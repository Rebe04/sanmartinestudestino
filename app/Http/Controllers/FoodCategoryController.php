<?php

namespace App\Http\Controllers;

use App\Models\FoodCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodCategoryController extends Controller
{
    public function index(){
        return Inertia::render('FoodCategories/Index', [
            'food_categories' => FoodCategory::paginate(10)
        ]);
    }

    public function show(FoodCategory $foodCategory) {
        return Inertia::render('FoodCategories/Show', [
            'food_category' => $foodCategory
        ]);
    }
}
