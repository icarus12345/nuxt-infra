<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'content',
        'published_at',
        'slug',
        'title',
        'thumb',
        'photos',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'published_at' => 'datetime',
        'photos' => 'array',
    ];

    // Optionally, format the date when accessed
    // protected function serializeDate(\DateTimeInterface $date)
    // {
    //     return $date->format(\DateTime::ATOM); // ISO 8601 format
    // }

    /**
     * @return BelongsTo
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * @return BelongsToMany
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
