
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
  }]
}

export const TagDataSource: IDataSource = {
  root: 'data',
  valueMember: 'id,type',
  displayMember: 'attributes>name',
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
    view: 'view_tag',
    create: 'create_tag',
    delete: 'delete_tag',
    edit: 'edit_tag',
  }
}