<?php
namespace App\Entities;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class MediaStorage
{
    private string $disk;
    public function __construct()
    {
        $this->disk = config("MEDIA_DISK", "public");
    }

    private function getPath(string $url) {
        $base = Storage::disk($this->disk)->url('');
        return Str::after($url, $base);
    }

    public function find(string $path): ?Media
    {
        $url = Storage::disk($this->disk)->url($path);
        Log::info("FIND");
        return new Media([
            'type' => 'file',
            'name' => basename($path),
            'path' => $this->getPath($url),
            'url' => $url,
            'size' => Storage::disk($this->disk)->size($path),
            'mimeType' => Storage::disk($this->disk)->mimeType($path)
        ]);
    }


    public function allFiles($path = 'photos')
    {
        return collect(
                Storage::disk($this->disk)
                    ->files($path)
            )
            ->filter(function ($file) {
                $mimeType = Storage::disk($this->disk)->mimeType($file);
                return str_starts_with($mimeType, 'image/');
            })
            ->map(function ($file) {
                $url = Storage::disk($this->disk)->url($file);
                return new Media([
                    'type' => 'file',
                    'name' => basename($file),
                    'path' => $this->getPath($url),
                    'url' => $url,
                    'size' => Storage::disk($this->disk)->size($file),
                    'mimeType' => Storage::disk($this->disk)->mimeType($file)
                ]);
            });
    }

    public function allDirectories($path = 'photos')
    {
        return collect(
                Storage::disk($this->disk)
                ->directories($path, true)
            )
            ->map(function ($folder) {
                $url = Storage::disk(name: $this->disk)->url($folder);
                return new Media([
                    'type' => 'folder',
                    'name' => basename($folder),
                    'path' => $this->getPath($url),
                    'url' => $url,
                ]);
            });
    }

    public function store(string $name, string $base64): Media
    {
        $replace = substr($base64, 0, strpos($base64, ',')+1); 
        $content = str_replace($replace, '', $base64);

        $content = str_replace(' ', '+', $content);
        $content = base64_decode($content);
        if (Storage::disk($this->disk)->exists($name)) {
            $suffix = now()->format('ymd_His');
            $ext = pathinfo($name, PATHINFO_EXTENSION);
            $fileName = pathinfo($name, PATHINFO_FILENAME);
            $path = pathinfo($name, PATHINFO_DIRNAME);
            $name = "$path/{$fileName}_{$suffix}.{$ext}";
        }
        Storage::disk($this->disk)->put($name, $content, 'public');
        $url = Storage::disk(name: $this->disk)->url($name);
        return new Media([
            'type' => 'file',
            'name' => basename($name),
            'path' => $this->getPath($url),
            'url' => $url,
            'size' => Storage::disk($this->disk)->size($name),
            'mimeType' => Storage::disk($this->disk)->mimeType($name)
        ]);
    }

    public function remove($media): void
    {

    }

}