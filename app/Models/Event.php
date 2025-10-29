<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'starts_at',
        'finishes_at',
        'event_category_id',
    ];

    //    Relación Polimorfica

    public function routes()
    {
        return $this->morphToMany(Route::class, 'routable');
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    protected function casts(): array
    {
        return [
            'starts_at' => 'date',
            'finishes_at' => 'date',
        ];
    }

    public function getRouteKeyName()
    {
        return "slug";
    }


//    Relación uno amuchos inversa
    public function eventCategory() {
        return $this->belongsTo(EventCategory::class);
    }

    //Relación uno a muchos
    public function subevent(){
        return $this->hasMany(SubEvent::class);
    }
}
