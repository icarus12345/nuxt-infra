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
            'create_user',
            'edit_user',
            'delete_user',
            'view_user',

            'create_role',
            'edit_role',
            'delete_role',
            'view_role',

            'create_permission',
            'edit_permission',
            'delete_permission',
            'view_permission',

            'create_media',
            'delete_media',
            'view_media',
        ];

        foreach ($permissions as $permission) {
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