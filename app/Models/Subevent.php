<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subevent extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'date',
        'duration',
        'event_id',
        'id',
    ];

    //    Relación Polimorfica

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    //Relación uno a muchos inversa

    public function event(){
        return $this->belongsTo(Event::class);
    }

    //Relación muchos a muchos
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'subevent_tag');
    }

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }
}
