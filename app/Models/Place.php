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

    public function routes()
    {
        return $this->morphToMany(Route::class, 'routable');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable')->latestOfMany();
    }

    public function getRouteKeyName()
    {
        return "slug";
    }


    //    Relación uno amuchos inversa
    public function placeCategory() {
        return $this->belongsTo(PlaceCategory::class);
    }
}
