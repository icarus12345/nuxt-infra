<?php
namespace App\JsonApi\V1\Medias\Capabilities;

use App\Entities\MediaStorage;
use Illuminate\Support\Facades\Log;
use LaravelJsonApi\NonEloquent\Capabilities\QueryAll;
use LaravelJsonApi\NonEloquent\Capabilities\QueryOnce;

class QueryMedias extends QueryAll
{

    private MediaStorage $storage;

    public function __construct(MediaStorage $storage)
    {
        parent::__construct();
        $this->storage = $storage;
    }

    public function get(): iterable
    {
      $filters = $this->queryParameters->filter();
      $path = $filters ? $filters->value('path', 'photos') : 'photos';
      return $this->storage->allDirectories($path)->merge($this->storage->allFiles($path));
    }

}