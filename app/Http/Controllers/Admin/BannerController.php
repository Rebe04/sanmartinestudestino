<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index()
    {
        return Banner::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required'],
            'subtitle' => ['required'],
            'form' => ['boolean'],
            'active' => ['boolean'],
        ]);

        return Banner::create($data);
    }

    public function show(Banner $banner)
    {
        return $banner;
    }

    public function update(Request $request, Banner $banner)
    {
        $data = $request->validate([
            'title' => ['required'],
            'subtitle' => ['required'],
            'form' => ['boolean'],
            'active' => ['boolean'],
        ]);

        $banner->update($data);

        return $banner;
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();

        return response()->json();
    }
}
