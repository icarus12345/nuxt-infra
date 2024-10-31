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
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Tạo Roles và gán Permissions
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo($permissions);

        $role = Role::create(['name' => 'user']);
        $role->givePermissionTo($permissions);

        $role = Role::create(['name' => 'viewer']);
        $role->givePermissionTo(['user_view']);

        User::find(1)->assignRole('admin');
        User::find(2)->assignRole('user');
    }
}