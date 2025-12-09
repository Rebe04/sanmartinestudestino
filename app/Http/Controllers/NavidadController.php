<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NavidadController extends Controller
{
    public function index()
    {
        $ogImage = asset('images/seo/navidad_mini.webp');
        return Inertia::render('Navidad/Index',
        [
            'seo' => [
                'title' => "Marco Navideño",
                'description' => "Crea tu marco navideño y vive la navidad con nosotros. San Martín es tu destino",
                'image' => $ogImage
            ]
        ]);
    }
}
