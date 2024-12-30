import { h } from 'vue'
import Badge from '#ui/components/badge/Badge.vue';
import { DataAdapter, Field, FieldSchema } from '@interfaces';
import Zod from 'zod'
import { RoleSchema } from './role.schema';
import { PermissionSchema } from './permission.schema';
import { ISchema } from '../types/schema';

const UserRepository = useRepository('users')
const RoleRepository = useRepository('roles')
const PermissionRepository = useRepository('permissions')
export const columns = [{
  fieldType: 'Selection',
  width: 40,
  pinned: 'left',
}, {
  text: 'ID',
  dataField: 'id',
  filterable: true,
  filterType: 'Number',
  hideable: false,
  sortable: true,
  align: 'right',
  width: 80,
  pinned: 'left',
}, {
  text: 'Name',
  dataField: 'name',
  displayField: 'attributes>name',
  filterable: true,
  hideable: true,
  sortable: true,
  minWidth: 220,
}, {
  text: 'Email',
  dataField: 'email',
  displayField: 'attributes>email',
  filterable: true,
  hideable: true,
  sortable: true,
  width: 220,
}, {
  text: 'Roles',
  dataField: 'roles',
  displayField: 'relationships>roles>data',
  filterable: true,
  quickFilter: true,
  filterType: 'TagsInput',
  filterCondition: 'IN',
  dataSource: {
    root: 'data',
    valueMember: 'id',
    displayMember: 'attributes>name',
    fetch: RoleRepository.fetch
  },
  // async filterData() {
  //   const resource = await RoleRepository.fetch()
  //   return resource.data.map(({id, attributes: {name}}) => {
  //     return  {
  //       value: id,
  //       label: name,
  //     }
  //   })
  // },
  hideable: true,
  // hide?: boolean
  // renderer?: void
  cellsRenderer({cell, getValue}) {
    const roles = getValue() || []
    if (!roles.length) return '';
    return h(
      'div',
      { class: 'flex gap-1 flex-wrap capitalize' },
      roles.map((role) => h(Badge, { variant: 'outline' }, () => role.attributes.name)),
    )
  },
  // cellsFormat?: string
  // align?: 'left' | 'center' | 'right'
  width: 180,
}, {
  text: 'Permissions',
  dataField: 'totalPermissions',
  displayField: 'relationships>permissions>meta>count',
  cellsFormat: 'n',
  hideable: true,
  // cellsFormat?: string
  // align?: 'left' | 'center' | 'right'
  width: 100,
}, {
  text: 'Active',
  dataField: 'active',
  displayField: 'attributes>active',
  hideable: true,
  sortable: true,
  filterable: true,
  quickFilter: true,
  filterType: 'CheckList',
  dataSource: [
    {
      value: 1,
      label: 'Active',
    },
    {
      value: 0,
      label: 'In-Active',
    },
  ],
  cellsRenderer({cell, getValue}) {
    const active = getValue()
      return h('div', { class: 'flex gap-1' }, 
        h(Badge, { variant: 'dot', color: active ? 'success': 'muted' }, () => active ? 'Active' : 'In-Active'),
      )
  },
  width: 120,
}, {
  text: 'Created',
  dataField: 'createdAt',
  displayField: 'attributes>createdAt',
  cellsFormat: 'd',
  filterable: true,
  filterType: 'Date',
  hideable: true,
  sortable: true,
  width: 120,
}, {
  text: 'Modified',
  dataField: 'updatedAt',
  displayField: 'attributes>updatedAt',
  cellsFormat: 'd',
  filterable: true,
  filterType: 'Date',
  hideable: true,
  hidden: true,
  sortable: true,
  width: 120,
}, {
  fieldType: 'Action',
  width: 40,
  pinned: 'right',
}]

export const schema: FieldSchema = {
  name: 'User Entity',
  description: 'Associate users with roles and permissions',
  size: 'lg',
  fields: [{
    text: 'Name',
    dataField: 'name',
    displayField: 'attributes>name',
    shape: Zod.string().min(2),
    fieldType: 'Textbox'
  }, {
    text: 'Email',
    dataField: 'email',
    displayField: 'attributes>email',
    shape: Zod.string().email(),
    fieldType: 'Textbox'
  }, {
    text: 'Avatar',
    dataField: 'avatar',
    displayField: 'attributes>avatar',
    shape: Zod.string(),
    fieldType: 'Media'
  }, {
    text: 'Roles',
    dataField: 'relationships>roles',
    displayField: 'relationships>roles>data:id,type',
    hint: 'Associate users with roles and permissions',
    shape: Zod.array(Zod.any()).min(1),
    fieldType: 'TagsInput',
    schema: RoleSchema,
  }, {
    text: 'Permission',
    dataField: 'relationships>permissions',
    displayField: 'relationships>permissions>data:id,type',
    hint: 'Associate users with roles and permissions',
    shape: Zod.array(Zod.any()).min(1),
    // fieldType: 'CheckList', sử dụng common component 
    component: defineAsyncComponent(() => import('../components/AutoForm/PermissionCheckList.vue')), // tự custom component
    schema: PermissionSchema, // load từ schema
    // dataSource: { // load từ data source
    //   root: 'data',
    //   valueMember: 'id,type',
    //   displayMember: 'attributes>name',
    //   fetch: PermissionRepository.fetch
    // },
  }, {
    text: 'Active',
    dataField: 'active',
    displayField: 'attributes>active',
    shape: Zod.boolean().optional(),
    fieldType: 'Checkbox'
  }]
}

export const MemberDataSource = {
  root: 'data',
  params: {
    include: 'roles,permissions',
    withCount: 'permissions'
  },
  // beforeSend(p) {
  // },
  // beforeLoadComplete(res) {
  // },
  fetch: UserRepository.fetch,
  save: UserRepository.save,
  delete: UserRepository.delete,
}

export const MemberSchema: ISchema = {
  name: 'User Management',
  description: 'Associate users with roles and permissions',
  source: MemberDataSource,
  columns,
  schema,
  permissions: {
    view: 'view_user',
    create: 'create_user',
    delete: 'delete_user',
    edit: 'edit_user',
  }
}