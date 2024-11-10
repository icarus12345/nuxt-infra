<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Log;

class CommentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
        return $user->hasPermissionTo('view_role');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Comment $model): bool
    {
        return true;
        return $user->hasPermissionTo('view_role');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
        return $user->hasPermissionTo('create_role');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Comment $model): bool
    {
        return true;
        if ($user->id === $model->id) return false;
        return $user->hasPermissionTo('edit_role');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Comment $model): bool
    {
        return true;
        if ($user->id === $model->id) return false;
        return $user->hasPermissionTo('delete_role');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Comment $model): bool
    {
        return true;
        if ($user->id === $model->id) return false;
        return $user->hasPermissionTo('delete_role');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Comment $model): bool
    {
        return true;
        return $user->hasPermissionTo('delete_role');
    }
}
