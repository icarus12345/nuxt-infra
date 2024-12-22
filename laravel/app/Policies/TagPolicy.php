<?php

namespace App\Policies;

use App\Traits\HasPermissions;
use App\Models\Tag;
use App\Models\User;

class TagPolicy
{
    use HasPermissions;
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // $this->hasPermissionTo('view_tags');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Tag $model): bool
    {
        return true; // $this->hasPermissionTo('view_role');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // $this->hasPermissionTo('create_tag');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Tag $model): bool
    {
        return true; // $this->hasPermissionTo('edit_tag');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Tag $model): bool
    {
        return true; // $this->hasPermissionTo('delete_tag');
    }

}
