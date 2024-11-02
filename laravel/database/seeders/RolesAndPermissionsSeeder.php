<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
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
            Permission::create(['name' => $permission, 'display' => $name]);
        }

        // Tạo Roles và gán Permissions
        $role = Role::create(['name' => 'admin', 'display' => 'Admin']);
        $role->givePermissionTo($permissions);

        $role = Role::create(['name' => 'user', 'display' => 'User']);
        $role->givePermissionTo($permissions);

        $role = Role::create(['name' => 'viewer', 'display' => 'Viewer']);
        $role->givePermissionTo(['user_view']);

        User::find(1)->assignRole('admin');
        User::find(2)->assignRole('user');
    }
}