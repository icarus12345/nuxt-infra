<?php
namespace App\JsonApi\V1\Medias;

use App\Entities\MediaStorage;
use Illuminate\Support\Facades\Log;
use LaravelJsonApi\NonEloquent\AbstractRepository;
use LaravelJsonApi\Contracts\Store\QueriesAll;
use LaravelJsonApi\NonEloquent\Concerns\HasCrudCapability;
use LaravelJsonApi\Contracts\Store\CreatesResources;

class MediaRepository extends AbstractRepository implements QueriesAll, CreatesResources
{
    use HasCrudCapability;
    private MediaStorage $storage;

    public function __construct(MediaStorage $storage)
    {
        $this->storage = $storage;
    }

    public function find(string $resourceId): ?object
    {
        Log::info("FIND");
        return $this->storage->find($resourceId);
    }

    public function queryAll(): Capabilities\QueryMedias
    {
        return Capabilities\QueryMedias::make();
    }
    
    protected function crud(): Capabilities\CrudMedia
    {
        return Capabilities\CrudMedia::make();
    }

}