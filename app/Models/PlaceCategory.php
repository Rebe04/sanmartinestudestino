<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlaceCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
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

    //    Relación uno a muchos
    public function place() {
        return $this->hasMany(Place::class);
    }
}
