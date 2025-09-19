<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hotel extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'description',
        'price_range',
        'instagram',
        'youtube',
        'phone',
        'email',
        'web',
    ];

//    Relación Polimorfica
    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    //    Relación muchos a muchos

    public function amenities(){
        return $this->belongsToMany(Amenity::class, 'hotel_amenity');
    }

    public function routes (){
        return $this->belongsToMany(Route::class);
    }
}
