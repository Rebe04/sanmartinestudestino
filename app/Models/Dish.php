<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dish extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'restaurant_id',
    ];

//    Relación Polimorfica

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

//    Relación uno a muchos inversa
    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
