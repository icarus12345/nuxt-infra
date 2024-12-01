<?php

namespace App\JsonApi\V1\Medias;

use App\Models\Media;
use Illuminate\Http\Request;
use LaravelJsonApi\Core\Resources\JsonApiResource;

class MediaResource extends JsonApiResource
{

    public function id(): string
    {
        return $this->resource->name;
    }
    public function attributes($request): iterable
    {
        return $this->resource->toArray();
    }

    public function relationships($request): iterable
    {
        return [
            // @TODO
        ];
    }

}
