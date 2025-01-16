<?php

namespace App\Models;

// use App\Casts\Json;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Setting extends Model
{
    use HasFactory;
    public $incrementing = false;
    protected $keyType = 'string';
    /**
     * @var string[]
     */
    protected $fillable = [
        'title',
        'data',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'data' => 'json',
    ];
}
