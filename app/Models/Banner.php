<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Banner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'subtitle',
        'form',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'form' => 'boolean',
            'active' => 'boolean',
        ];
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
