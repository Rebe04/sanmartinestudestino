<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'extract',
        'content',
        'status',
        'user_id',
        'post_category_id',
    ];

    public function getRouteKeyName()
    {
        return "slug";
    }


    //    Relacion uno a muchos inversa
    public function postCategory() {
        return $this->belongsTo(PostCategory::class);
    }

    //    Relación Polimorfica
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    //Relación uno a muchos inversa

    public function user(){
        return $this->belongsTo(User::class);
    }
}
