<?php

namespace App\JsonApi\V1\Users;

use App\Models\User;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use App\JsonApi\Filters\WhereText;
use App\JsonApi\Filters\WhereNumber;
use App\JsonApi\Filters\WhereDate;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;
use LaravelJsonApi\Eloquent\Fields\Relations\HasMany;
use LaravelJsonApi\Eloquent\Fields\Relations\HasManyThrough;
use LaravelJsonApi\Eloquent\Fields\Relations\MorphTo;

class UserSchema extends Schema
{

    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = User::class;

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
            Str::make('email')->sortable(),
            // Map::make('profile', [
            //     Str::make('description'),
            //     Str::make('image'),
            // ])->on('profile'),
            HasMany::make('roles')->readOnly(),
            HasManyThrough::make('permissions'),
            // MorphTo::make('permissions', 'roles'),
            // Attribute::('permissions')->serializeUsing(fn($user) => $user->all_permissions),
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
            WhereNumber::make('id'),
            WhereText::make('name'),
            WhereText::make('email'),
            WhereDate::make('createdAt'),
            WhereDate::make('updatedAt'),
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
