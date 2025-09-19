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
        'description',
        'food_category_id',
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

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

//    Relacion uno a muchos inversa
    public function foodCategory() {
        return $this->belongsTo(FoodCategory::class);
    }

//    Relación uno a muchos
    public function dish(){
        return $this->hasMany(Dish::class);
    }

    //Relación muchos a muchos
    public  function routes(){
        return $this->belongsToMany(Route::class, 'route_restaurant');
    }
}
