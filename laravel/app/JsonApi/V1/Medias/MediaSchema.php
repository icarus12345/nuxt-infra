<?php

namespace App\JsonApi\V1\Medias;

use App\Entities\Media;
use LaravelJsonApi\Core\Schema\Schema;
use LaravelJsonApi\NonEloquent\Fields\Attribute;
use LaravelJsonApi\NonEloquent\Fields\ID;
use LaravelJsonApi\NonEloquent\Filters\Filter;

class MediaSchema extends Schema
{

    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = Media::class;
    protected bool $selfLink = false;

    public static function type(): string
    {
        return 'medias';
    }

    public function fields(): array
    {
        return [
            ID::make('name'),
            Attribute::make('name'),
            Attribute::make('path'),
            Attribute::make('content'),
        ];
    }

    public function filters(): array
    {
        return [
            Filter::make('path'),
            Filter::make('type'),
        ];
    }

    public function repository(): MediaRepository
    {
        return MediaRepository::make()
            ->withServer($this->server)
            ->withSchema($this);
    }

}
