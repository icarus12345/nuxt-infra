import { h } from 'vue'
import Badge from '@/components/ui/badge/Badge.vue';
import { RoleRepository } from '@repositories'
import { DataAdapter } from '@interfaces';

export const columns = [{
  columnType: 'Selection',
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
  columnType: 'custom',
  filterable: true,
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
  text: 'Active',
  dataField: 'active',
  displayField: 'attributes>active',
  columnType: 'custom',
  hideable: true,
  sortable: true,
  filterable: true,
  filterType: 'CheckList',
  filterData: [
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
  columnType: 'Action',
  width: 40,
  pinned: 'right',
}]