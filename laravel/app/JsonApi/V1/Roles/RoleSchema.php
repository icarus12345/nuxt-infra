<?php

namespace App\JsonApi\V1\Roles;

use App\Models\Role;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsToMany;
use LaravelJsonApi\Eloquent\Fields\Relations\HasMany;
use App\JsonApi\Filters\WhereText;
use App\JsonApi\Filters\WhereNumber;
use App\JsonApi\Filters\WhereDate;
use App\JsonApi\Filters\WhereAny;

class RoleSchema extends Schema
{

    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = Role::class;
    protected bool $selfLink = false;
    /**
     * Get the resource fields.
     *
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('name')->sortable(),
            Str::make('guardName')->sortable(),
            BelongsToMany::make('permissions')->canCount()->countAs('totalPermissions'),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),
        ];
    }

    /**
     * Get the resource filters.
     *
     * @return array
     */
    public function filters(): array
    {
        return [
            // WhereIdIn::make($this),
            WhereNumber::make('id'),
            WhereText::make('name'),
            WhereText::make('guardName'),
            WhereDate::make('createdAt'),
            WhereDate::make('updatedAt'),
            WhereAny::make('q', ['name'])
        ];
    }

    /**
     * Get the resource paginator.
     *
     * @return Paginator|null
     */
    public function pagination(): ?Paginator
    {
        return PagePagination::make();
    }

}
