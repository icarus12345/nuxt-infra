import { h } from 'vue'
import Badge from '@ui/components/badge/Badge.vue';
import { DataAdapter, Field, FieldSchema } from '@interfaces';
import Zod from 'zod'
import { TagSchema } from './tag.schema';
import { ISchema } from '../types/schema';

const PostRepository = useRepository('posts')
const TagRepository = useRepository('tags')

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
  text: 'Title',
  dataField: 'title',
  displayField: 'attributes>title',
  filterable: true,
  hideable: true,
  sortable: true,
  minWidth: 220,
}, {
  text: 'Tags',
  dataField: 'tags',
  displayField: 'relationships>tags>data',
  filterable: true,
  quickFilter: true,
  filterType: 'TagsInput',
  filterCondition: 'IN',
  dataSource: {
    root: 'data',
    fields: [{
      type: 'number',
      name: 'value',
      map: 'id',
    }, {
      type: 'string',
      name: 'label',
      map: 'attributes>name'
    }],
    fetch: TagRepository.fetch
  },
  // async filterData() {
  //   const resource = await TagRepository.fetch()
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
    const tags = getValue() || []
    if (!tags.length) return '';
    return h(
      'div',
      { class: 'flex gap-1 flex-wrap capitalize' },
      tags.map((tag) => h(Badge, { variant: 'outline' }, () => tag.attributes.name)),
    )
  },
  // cellsFormat?: string
  // align?: 'left' | 'center' | 'right'
  width: 180,
}, {
  text: 'PublishedAt',
  dataField: 'publishedAt',
  displayField: 'attributes>publishedAt',
  cellsFormat: 'd',
  filterable: true,
  filterType: 'Date',
  hideable: true,
  sortable: true,
  width: 120,
}, {
  text: 'Created',
  dataField: 'createdAt',
  displayField: 'attributes>createdAt',
  cellsFormat: 'd',
  filterable: true,
  filterType: 'Date',
  hideable: true,
  hidden: true,
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
  name: 'Post Entity',
  description: 'Associate users with roles and permissions',
  size: '2xl',
  fields: [{
    text: 'Title',
    dataField: 'title',
    displayField: 'attributes>title',
    shape: Zod.string().min(2),
    fieldType: 'Textbox'
  }, {
    text: 'Content',
    dataField: 'content',
    displayField: 'attributes>content',
    shape: Zod.string(),
    fieldType: 'RichText'
  }, {
    text: 'Thumbs',
    dataField: 'thumb',
    displayField: 'attributes>thumb',
    shape: Zod.string(),
    fieldType: 'Media'
  }, {
    text: 'Photos',
    dataField: 'photos',
    displayField: 'attributes>photos',
    shape: Zod.array(Zod.string()).min(2).max(5),
    fieldType: 'Photos'
  }, {
    text: 'Tags',
    dataField: 'relationships>tags',
    displayField: 'relationships>tags>data:id,type',
    hint: 'Associate users with roles and permissions',
    shape: Zod.array(Zod.any()).min(1),
    fieldType: 'TagsInput',
    schema: TagSchema,
    className: 'col-span-6',
    // dataSource: {
    //   root: 'data',
    //   valueMember: 'id,type',
    //   displayMember: 'attributes>name',
    //   // fields: [{
    //   //   name: 'value',
    //   //   map: 'id,type',
    //   // }, {
    //   //   name: 'label',
    //   //   map: 'attributes>name'
    //   // }],
    //   fetch: RoleRepository.fetch
    // },
  // }, {
  //   text: 'Roles3',
  //   dataField: 'roles3',
  //   displayField: 'relationships>roles>data:id,type',
  //   shape: Zod.array(Zod.any()).min(1),
  //   fieldType: 'CheckList',
  //   dataSource: {
  //     root: 'data',
  //     valueMember: 'id,type',
  //     displayMember: 'attributes>name',
  //     // fields: [{
  //     //   name: 'value',
  //     //   map: 'id',
  //     // }, {
  //     //   name: 'label',
  //     //   map: 'attributes>name'
  //     // }],
  //     fetch: RoleRepository.fetch
  //   },
  // }, {
  //   text: 'Roles4',
  //   dataField: 'roles4',
  //   displayField: 'relationships>roles>data',
  //   shape: Zod.array(Zod.any()).min(1),
  //   fieldType: 'array',
  // }, {
  //   text: 'Roles2',
  //   dataField: 'roles2',
  //   displayField: 'relationships>roles>data>id',
  //   shape: Zod.array(Zod.any()).min(1),
  //   fieldType: 'CheckList',
  //   dataSource: {
  //     root: 'data',
  //     valueMember: 'id',
  //     displayMember: 'attributes>name',
  //     // fields: [{
  //     //   name: 'value',
  //     //   map: 'id,type',
  //     // }, {
  //     //   name: 'label',
  //     //   map: 'attributes>name'
  //     // }],
  //     fetch: RoleRepository.fetch
  }, {
    text: 'Published At',
    dataField: 'publishedAt',
    displayField: 'attributes>publishedAt',
    shape: Zod.boolean().optional(),
    fieldType: 'Date',
    className: 'col-span-4'
  // }, {
  //   text: 'Active2',
  //   dataField: 'Active2',
  //   displayField: 'relationships>roles>data>id',
  //   shape: Zod.array(Zod.string()).min(1),
  //   fieldType: 'CheckList',
  //   dataSource: ['0', '1', '2']
  // }, {
  //   text: 'Active3',
  //   dataField: 'Active3',
  //   displayField: 'relationships>roles>data>id',
  //   shape: Zod.string(),
  //   fieldType: 'Select',
  //   dataSource: ['0', '1', '2']
  // }, {
  //   text: 'Active4',
  //   dataField: 'Active4',
  //   displayField: 'relationships>roles>data>id',
  //   shape: Zod.string(),
  //   fieldType: 'Select',
  //   dataSource: {
  //     root: 'data',
  //     fields: [{
  //       name: 'value',
  //       map: 'id',
  //     },{
  //       name: 'label',
  //       map: 'attributes>name'
  //     }],
  //     fetch: RoleRepository.fetch
  //   },
  // }
  }]
}

export const PostDataSource = {
  root: 'data',
  params: {
    include: 'author,tags',
    withCount: 'comments'
  },
  // beforeSend(p) {
  // },
  // beforeLoadComplete(res) {
  // },
  fetch: PostRepository.fetch,
  save: PostRepository.save,
  delete: PostRepository.delete,
}

export const PostSchema: ISchema = {
  name: 'Post Management',
  description: 'Associate users with roles and permissions',
  source: PostDataSource,
  columns,
  schema,
  permissions: {
    view: 'view_post',
    create: 'create_post',
    delete: 'delete_post',
    edit: 'edit_post',
  }
}