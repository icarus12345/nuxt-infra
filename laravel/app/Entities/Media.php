<?php
namespace App\Entities;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Log;

class Media implements Arrayable
{

    public string $type;
    public string $name;
    public string $path;
    public ?string $mimeType;
    public ?string $size;
    public ?string $url;

    public function __construct($values)
    {
        if (!$values) return;
        $this->name = $values["name"];
        $this->path = $values["path"];
        $this->url = $values["url"];
        $this->size = $values["size"] ?? '';
        $this->mimeType = $values["mimeType"] ?? '';
        $this->type = $values["type"] ?? '';
    }


    public function toArray()
    {
        return [
            'type' => $this->type,
            'name' => $this->name,
            'path' => $this->path,
            'url' => $this->url,
            'size' => $this->size ?? 0,
            'mimeType' => $this->mimeType ?? null
        ];
    }

}