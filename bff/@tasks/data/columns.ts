import { h } from 'vue'
import Checkbox from '@/components/ui/checkbox/CheckBox.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import DataTableColumnHeader from '@tasks/components/DataTableColumnHeader.vue';
import DataTableRowActions from '@tasks/components/DataTableRowActions.vue';
import { Icon } from '#components'
import { RoleRepository } from '@repositories'
import { IRole } from '@entities'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Task } from '../data/schema'
import { labels, priorities, actives } from '../data/data'

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    size: 40,
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    size: 80,
    accessorKey: 'id',
    header: 'ID',
    // cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('id')),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    accessorFn: (row: any, index: number) => row.attributes.name,
    meta: {
      filterType: 'text'
    }
  },
  {
    size: 220,
    accessorKey: 'email',
    accessorFn: (row: any, index: number) => row.attributes.email,
    header: 'Email',
    meta: {
      filterType: 'text'
    }
  },
  {
    size: 180,
    accessorKey: 'roles',
    enableSorting: false,
    accessorFn: (row: any, index: number) => row.relationships?.roles?.data,
    header: 'Roles',
    cell: ({cell, getValue}) => {
      const roles = getValue<IRole>() || []
      if (!roles.length) return '';
      return h(
        'div',
        { class: 'flex gap-1 flex-wrap capitalize' },
        roles.map((role) => h(Badge, { variant: 'outline' }, () => role.attributes.name)),
      )
    },
    meta: {
      filterType: 'list',
      async filterData() {
        const resource = await RoleRepository.fetch()
        return resource.data.map(({id, attributes: {name}}) => {
          return  {
            value: id,
            label: name,
          }
        })
      },
    }
  },
  {
    size: 120,
    accessorKey: 'active',
    accessorFn: (row: any, index: number) => row.attributes.active,
    header: 'Active',
    cell: ({ getValue }) => {
      const active = getValue()
      return h('div', { class: 'flex gap-1' }, 
        h(Badge, { variant: 'dot', color: active ? 'success': 'muted' }, () => active ? 'Active' : 'In-Active'),
      )
    },
    meta: {
      filterType: 'list',
      filterData: actives,
    }
  },
  {
    size: 120,
    accessorKey: 'createdAt',
    accessorFn: (row: any, index: number) => cellFormat(row.attributes.createdAt, 'd'),
    header: 'Created',
    meta: {
      filterType: 'date',
    }
  },
  {
    size: 120,
    accessorKey: 'updatedAt',
    accessorFn: (row: any, index: number) => cellFormat(row.attributes.updatedAt, 'd'),
    header: 'Modified',
    meta: {
      filterType: 'date',
      visibility: false
    }
  },
  {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    size: 40,
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
