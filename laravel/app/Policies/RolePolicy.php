<?php

namespace App\Policies;

use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class RolePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        Log::debug($user);
        return $user->hasRole('view_permission');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Role $model): bool
    {
        return $user->hasPermissionTo('view_permission');
    }
}
