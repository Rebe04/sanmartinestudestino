<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Restaurant extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'slug',
        'description',
        'food_category_id',
        'url',
    ];

    public function getRouteKeyName()
    {
        return "slug";
    }

//    Relación polimorfica
    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable')->latestOfMany();
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

//    Relacion uno a muchos inversa
    public function foodCategory() {
        return $this->belongsTo(FoodCategory::class);
    }

//    Relación uno a muchos
    public function dishes(){
        return $this->hasMany(Dish::class);
    }

    //Relación muchos a muchos
    public  function routes(){
        return $this->belongsToMany(Route::class, 'route_restaurant');
    }
}
