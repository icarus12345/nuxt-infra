<?php
namespace App\Traits;

use App\Models\Permission;
use Tymon\JWTAuth\Facades\JWTAuth;

trait HasPermissions
{
    public function hasPermissionTo($perm): bool
    {
      $claims = JWTAuth::getPayload()->toArray();
      $perms = $claims['permissions'] ?? [];
      return in_array($perm, $perms);
    }

    // public function filterPermission($permission, $guardName = 'web')
    // {
    //     if (is_string($permission)) {
    //         $permission = Permission::findByName(
    //             $permission,
    //             $guardName
    //         );
    //     }

    //     return $permission;
    // }

    // public function hasPermissionTo($permission, $guardName = 'web'): bool
    // {
    //     $permission = $this->filterPermission($permission, $guardName);

    //     return $this->hasDirectPermission($permission) || $this->hasPermissionViaRole($permission);
    // }

    // public function hasDirectPermission($permission): bool
    // {
    //     $permission = $this->filterPermission($permission);

    //     return $this->permissions->contains($permission->getKeyName(), $permission->getKey());
    // }

    // protected function hasPermissionViaRole(Permission $permission): bool
    // {
    //   return $this->hasRole($permission->roles);
    // }
}