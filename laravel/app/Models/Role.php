<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // Các thuộc tính có thể được gán giá trị hàng loạt
    protected $fillable = ['name', 'guard_name'];

    /**
     * Quan hệ nhiều-nhiều với model Permission
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role');
    }

    // public function hasPermissionTo($permission, string $guardName = 'web'): bool
    // {
    //     $permission = $this->filterPermission($permission, $guardName);

    //     return $this->permissions->contains($permission->getKeyName(), $permission->getKey());
    // }
}
