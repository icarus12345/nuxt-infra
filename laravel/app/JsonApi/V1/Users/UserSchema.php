<?php

namespace App\JsonApi\V1\Users;

use App\Models\User;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Fields\Boolean;
use LaravelJsonApi\Eloquent\Filters\Where;
use App\JsonApi\Filters\WhereAny;
use LaravelJsonApi\Eloquent\Filters\WhereHas;
use App\JsonApi\Filters\WhereText;
use App\JsonApi\Filters\WhereNumber;
use App\JsonApi\Filters\WhereDate;
use Illuminate\Support\Facades\Log;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;
use LaravelJsonApi\Eloquent\Fields\Relations\HasMany;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsToMany;
use LaravelJsonApi\Eloquent\Fields\Relations\HasManyThrough;
use LaravelJsonApi\Eloquent\SoftDeletes;
use LaravelJsonApi\Eloquent\Fields\SoftDelete;
use LaravelJsonApi\Eloquent\Filters\OnlyTrashed;
use LaravelJsonApi\Eloquent\Fields\Relations\MorphTo;

class UserSchema extends Schema
{
    use SoftDeletes;
    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = User::class;
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
            Str::make('email')->sortable(),
            Boolean::make('active')->sortable(),
            // Map::make('profile', [
            //     Str::make('description'),
            //     Str::make('image'),
            // ])->on('profile'),
            BelongsToMany::make('roles'),
            HasManyThrough::make('permissions'),
            // MorphTo::make('permissions', 'roles'),
            // Attribute::('permissions')->serializeUsing(fn($user) => $user->all_permissions),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),
            SoftDelete::make('deletedAt'),
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
            WhereNumber::make('active'),
            WhereText::make('name'),
            WhereText::make('email'),
            WhereDate::make('createdAt'),
            WhereDate::make('updatedAt'),
            OnlyTrashed::make('archived'),
            WhereHas::make($this, 'roles'),
            WhereAny::make('q', ['name', 'email'])
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
