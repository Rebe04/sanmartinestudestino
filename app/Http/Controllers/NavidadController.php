<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NavidadController extends Controller
{
    public function index()
    {
        return Inertia::render('Navidad/Index');
    }
}
