
import { FieldSchema, IDataSource } from '@interfaces';
import Zod from 'zod'
import { ISchema } from '../types/schema';

const SettingRepository = useRepository('settings')

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
    fieldType: 'Textbox',
    className: 'sm:col-span-6'
  },{
    text: 'App Name',
    dataField: 'appName',
    displayField: 'attributes>data>appName',
    shape: Zod.string().min(2),
    fieldType: 'Textbox',
    className: 'sm:col-span-6 sm:row-start-2'
  },{
    text: 'Banner',
    dataField: 'banner',
    displayField: 'attributes>data>banner',
    shape: Zod.array(Zod.string()).min(2).max(5),
    fieldType: 'Photos',
  },{
    text: 'Hot',
    dataField: 'news',
    displayField: 'attributes>data>news',
    shape: Zod.array(Zod.object({
      title: Zod.string(),
      thumb: Zod.string(),
      photos: Zod.array(Zod.string()),
      content: Zod.string(),
    })),
    fieldTypes: {
      thumb: 'Media',
      photos: 'Photos',
    },
  }]
}

export const SettingDataSource: IDataSource = {
  root: 'data',
  valueMember: 'id,type',
  displayMember: 'attributes>name',
  // beforeSend(p) {
  // },
  // beforeLoadComplete(res) {
  // },
  get: SettingRepository.get,
  fetch: SettingRepository.fetch,
  save: SettingRepository.save,
  delete: SettingRepository.delete,
}

export const SettingSchema: ISchema = {
  name: 'Tag Management',
  description: 'Associate users with roles and permissions',
  source: SettingDataSource,
  columns,
  schema,
  permissions: {
    view: 'view_tag',
    create: 'create_tag',
    delete: 'delete_tag',
    edit: 'edit_tag',
  }
}