<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\User;
use App\Traits\HasPermissions;

class PermissionPolicy
{
    use HasPermissions;
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $this->hasPermissionTo('view_permission');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Permission $model): bool
    {
        return $this->hasPermissionTo('view_permission');
    }
}
