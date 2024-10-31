<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Post $model): bool
    {
        if ($model->published_at) {
            return true;
        }

        return $user && $user->is($model->author);
    }

    /**
     * Determine whether the user can view the post's author.
     */
    public function viewAuthor(?User $user, Post $model): bool
    {
        return $this->view($user, $model);
    }

    /**
     * Determine whether the user can view the post's comments.
     */
    public function viewComments(?User $user, Post $model): bool
    {
        return $this->view($user, $model);
    }

    /**
     * Determine whether the user can view the post's tags.
     */
    public function viewTags(?User $user, Post $model): bool
    {
        return $this->view($user, $model);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Post $model): bool
    {
        return $user->is($model->author);
    }

    /**
     * Determine whether the user can update the model's tags relationship.
     */
    public function updateTags(User $user, Post $model): bool
    {
        return $this->update($user, $model);
    }

    /**
     * Determine whether the user can attach tags to the model's tags relationship.
     */
    public function attachTags(User $user, Post $model): bool
    {
        return $this->update($user, $model);
    }

    /**
     * Determine whether the user can detach tags from the model's tags relationship.
     */
    public function detachTags(User $user, Post $model): bool
    {
        return $this->update($user, $model);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Post $model): bool
    {
        return $this->update($user, $model);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Post $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Post $model): bool
    {
        return false;
    }
}
