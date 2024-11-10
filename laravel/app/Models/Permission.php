<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Permission extends Model
{
    use HasFactory;

    // Các thuộc tính có thể được gán giá trị hàng loạt
    protected $fillable = ['name', 'guard_name'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permission');
    }

    // public static function findByName(string $name, ?string $guardName = 'web')
    // {
    //     $permission = static::getPermission(['name' => $name, 'guard_name' => $guardName]);

    //     return $permission;
    // }

    // protected static function getPermissions(array $params = [], bool $onlyOne = false)
    // {
    //     return Permission::getPermissions($params, $onlyOne);
    // }

    // protected static function getPermission(array $params = [])
    // {
    //     return static::getPermissions($params, true)->first();
    // }
}
