<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'comment' => ['required'],
            'rating' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
            'reviewable_id' => ['required', 'integer'],
            'reviewable_type' => ['required'],
        ]);

        return Review::create($data);
    }

    public function show(Review $review)
    {
        return $review;
    }

    public function update(Request $request, Review $review)
    {
        $data = $request->validate([
            'comment' => ['required'],
            'rating' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
            'reviewable_id' => ['required', 'integer'],
            'reviewable_type' => ['required'],
        ]);

        $review->update($data);

        return $review;
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json();
    }
}
