<?php
namespace App\JsonApi\V1\Medias\Capabilities;

use App\Entities\Media;
use App\Entities\MediaStorage;
use Illuminate\Support\Facades\Log;
use LaravelJsonApi\NonEloquent\Capabilities\CrudResource;
use LaravelJsonApi\Contracts\Store\CreatesResources;

class CrudMedia extends CrudResource
{
    private MediaStorage $storage;

    public function __construct(MediaStorage $storage)
    {
        parent::__construct();
        $this->storage = $storage;
    }

    public function create(array $data): Media
    {
        $name = $data['name'];
        $content = $data['content'] ?? null;
        if (empty($content)) {
            return $this->storage->mkdir($name);
        }
        return $this->storage->store($name, $content);
    }

    public function read(Media $media)
    {
        $filters = $this->queryParameters->filter();

        // if ($filters && $name = $filters->value('name')) {
        //     return Str::contains($media->getName(), $name) ? $site : null;
        // }

        return null;
    }
}