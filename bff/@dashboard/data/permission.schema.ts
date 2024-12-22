import { FieldSchema, IDataSource } from '@interfaces';
import Zod from 'zod'
import { ISchema } from '../types/schema';

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
  name: 'Permission Entity',
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
  }]
}

export const PermissionDataSource: IDataSource = {
  root: 'data',
  valueMember: 'id,type',
  displayMember: 'attributes>name',
  // beforeSend(p) {
  // },
  // beforeLoadComplete(res) {
  // },
  fetch: PermissionRepository.fetch,
  save: PermissionRepository.save,
  delete: PermissionRepository.delete,
}

export const PermissionSchema: ISchema = {
  name: 'Permission Management',
  description: 'Associate users with roles and permissions',
  source: PermissionDataSource,
  columns,
  schema,
  permissions: {
    view: 'view_permission',
    create: 'create_permission',
    delete: 'delete_permission',
    edit: 'edit_permission',
  }
}