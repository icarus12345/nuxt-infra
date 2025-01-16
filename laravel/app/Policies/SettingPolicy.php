<?php

namespace App\Policies;

use App\Models\Setting;
use App\Models\User;
use App\Traits\HasPermissions;

class SettingPolicy
{
    use HasPermissions;
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // $this->hasPermissionTo('view_setting');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Setting $model): bool
    {
        return true; // $this->hasPermissionTo('view_setting');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; // $this->hasPermissionTo('create_setting');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Setting $model): bool
    {
        return true; // $this->hasPermissionTo('edit_setting');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Setting $model): bool
    {
        return true; // $this->hasPermissionTo('delete_setting');
    }
}
