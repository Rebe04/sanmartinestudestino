<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Route extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'time',
        'description',
    ];

    public function getRouteKeyName()
    {
        return "slug";
    }

    //    Relación Polimorfica

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

//    Relación muchos a muchos

    public function places()
    {
        return $this->belongsToMany(Place::class, 'route_place');
    }

    public function restaurants()
    {
        return $this->belongsToMany(Restaurant::class, 'route_restaurant');
    }

    public function hotels()
    {
        return $this->belongsToMany(Hotel::class, 'route_hotel');
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'route_event');
    }
}
