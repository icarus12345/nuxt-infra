<?php

namespace App\Policies;

use App\Entities\Media;
use App\Models\User;
use App\Traits\HasPermissions;

class MediaPolicy
{
    use HasPermissions;
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $this->hasPermissionTo('view_media');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Media $model): bool
    {
        return $this->hasPermissionTo('view_media');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->hasPermissionTo('create_media');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Media $model): bool
    {
        return $this->hasPermissionTo('edit_media');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Media $model): bool
    {
        return $this->hasPermissionTo('delete_media');
    }

}
