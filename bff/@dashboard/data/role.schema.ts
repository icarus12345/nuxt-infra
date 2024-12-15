import { FieldSchema, IDataSource } from '@interfaces';
import Zod from 'zod'
import { ISchema } from '../types/schema';

const RoleRepository = useRepository('roles')
const PermissionRepository = useRepository('permissions')
const columns = [{
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
  text: 'Guard',
  dataField: 'guardName',
  displayField: 'attributes>guardName',
  filterable: true,
  hideable: true,
  sortable: true,
  minWidth: 100,
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

const schema: FieldSchema = {
  name: 'Role Entity',
  description: 'Associate users with roles and permissions',
  fields: [{
    text: 'Name',
    dataField: 'name',
    displayField: 'attributes>name',
    shape: Zod.string().min(2),
    fieldType: 'Textbox'
  }, {
    text: 'Guard',
    dataField: 'guardName',
    displayField: 'attributes>guardName',
    shape: Zod.string().min(2),
    fieldType: 'Textbox'
  }, {
    text: 'Permission',
    dataField: 'relationships>permissions',
    displayField: 'relationships>permissions>data:id,type',
    hint: 'Associate users with roles and permissions',
    shape: Zod.array(Zod.any()).min(1),
    fieldType: 'CheckList',
    dataSource: {
      root: 'data',
      valueMember: 'id,type',
      displayMember: 'attributes>name',
      // fields: [{
      //   name: 'value',
      //   map: 'id,type',
      // }, {
      //   name: 'label',
      //   map: 'attributes>name'
      // }],
      fetch: PermissionRepository.fetch
    },
  }]
}

export const RoleDataSource: IDataSource = {
  root: 'data',
  valueMember: 'id,type',
  displayMember: 'attributes>name',
  params: {
    include: 'permissions',
    withCount: 'permissions'
  },
  // beforeSend(p) {
  // },
  // beforeLoadComplete(res) {
  // },
  fetch: RoleRepository.fetch,
  save: RoleRepository.save,
  delete: RoleRepository.delete,
}

export const RoleSchema: ISchema = {
  name: 'Role Management',
  description: 'Associate users with roles and permissions',
  source: RoleDataSource,
  columns,
  schema,
  permissions: {
    view: 'view_role',
    create: 'create_role',
    delete: 'delete_role',
    edit: 'edit_role',
  }
}