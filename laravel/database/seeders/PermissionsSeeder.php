<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use App\Models\User;

class PermissionsSeeder extends Seeder
{
    public function run()
    {
        // Tạo Permissions
        $permissions = [
            'create_user' => 'Create User',
            'edit_user' => 'Edit User',
            'delete_user' => 'Delete User',
            'view_user' => 'View User',
            'create_role' => 'Create User',
            'edit_role' => 'Edit User',
            'delete_role' => 'Delete User',
            'view_role' => 'View User',
            'create_permission' => 'Create User',
            'edit_permission' => 'Edit User',
            'delete_permission' => 'Delete User',
            'view_permission' => 'View User',
        ];

        foreach ($permissions as $permission => $name) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Tạo Roles và gán Permissions
        $role = Role::create(['name' => 'admin', 'guard_name' => 'web']);

        // $role->givePermissionTo($permissions);

        $role = Role::create(['name' => 'user', 'guard_name' => 'web']);
        // $role->givePermissionTo($permissions);

        $role = Role::create(['name' => 'viewer', 'guard_name' => 'web']);
        // $role->givePermissionTo(['user_view']);


        // User::find(1)->assignRole('admin');
        // User::find(2)->assignRole('user');
    }
}