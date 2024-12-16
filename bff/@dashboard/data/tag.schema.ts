
import { FieldSchema, IDataSource } from '@interfaces';
import Zod from 'zod'
import { ISchema } from '../types/schema';

const TagRepository = useRepository('tags')

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
  name: 'Tag Entity',
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

export const TagDataSource: IDataSource = {
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
  fetch: TagRepository.fetch,
  save: TagRepository.save,
  delete: TagRepository.delete,
}

export const TagSchema: ISchema = {
  name: 'Tag Management',
  description: 'Associate users with roles and permissions',
  source: TagDataSource,
  columns,
  schema,
  permissions: {
    view: 'view_role',
    create: 'create_role',
    delete: 'delete_role',
    edit: 'edit_role',
  }
}