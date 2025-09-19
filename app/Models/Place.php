<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Place extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'price',
        'description',
        'instagram',
        'facebook',
        'youtube',
        'phone',
        'email',
    ];

    //    Relación Polimorfica

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function getRouteKeyName()
    {
        return "slug";
    }

    public function routes()
    {
        return $this->belongsToMany(Route::class, 'route_place');
    }
}
