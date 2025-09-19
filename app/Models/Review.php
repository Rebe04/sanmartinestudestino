<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'comment',
        'rating',
        'user_id',
        'reviewable_id',
        'reviewable_type',
    ];

    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
