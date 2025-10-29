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
        'slug',
        'time',
        'description',
    ];

    public function getRouteKeyName()
    {
        return "slug";
    }

    //    Relación Polimorfica

    public function places()
    {
        return $this->morphedByMany(Place::class, 'routable')->withPivot('order', 'description')->withTimestamps();
    }
    public function restaurants()
    {
        return $this->morphedByMany(Restaurant::class, 'routable')->withPivot('order', 'description')->withTimestamps();
    }

    public function hotels()
    {
        return $this->morphedByMany(Hotel::class, 'routable')->withPivot('order', 'description')->withTimestamps();
    }
    public function events()
    {
        return $this->morphedByMany(Event::class, 'routable')->withPivot('order', 'description')->withTimestamps();
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
