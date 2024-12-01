import { IEntity } from '@entities'

export interface IField {
  name: string
  type?: string // 'string', 'date', 'number', 'float', 'int' and 'bool'
  format?: string
  map?: string
}
export interface IDataSource<T> {
  data?: T[]
  root?: string
  total?: string
  fields: IField[]
  fetch?: any
  params?: any
  beforeSend?: any
  beforeLoadComplete?: any
  patch?: any
}

export interface IDataAdapter<T = IEntity> {
  source: IDataSource<T>
  dataBind: any
}

export class DataAdapter<T> {
  constructor(private source: IDataSource<T>, options = {}) {}
  async bind(params: any) {
    const resource = await this.source.fetch(params)
    let records = getValueByPath(resource, this.source.root || 'data')
    const total = getValueByPath(resource, this.source.total || 'meta>page>total')
    if (this.source.fields) {
      records = records.map((entity: IEntity) => {
        const row = {}
        this.source.fields.forEach(field => {
          row[field.name] = getValueByPath(entity, field.map || field.name)
        })
        return  row
      })
    }
    return {
      records,
      total,
    };
  }
}

export type ColumnType = 'Number' | 'Checkbox' | 'Textbox' | 'Combobox' | 'DropdownList' | ''
export type Column = {
  text?: string
  dataField?: string
  displayField?: string
  columnType?: string
  sortable?: boolean
  filterable?: boolean
  filter?: any
  filterType?: 'Textbox' | 'CheckList' | 'List' | 'Number' | 'Checkbox' | 'Date' | 'Range' | 'TagsInput'
  // filterCondition?: string
  // 'EMPTY', 'NOT_EMPTY', 'CONTAINS', 'CONTAINS_CASE_SENSITIVE', 
  // possible conditions for string filter
  // 'DOES_NOT_CONTAIN', 'DOES_NOT_CONTAIN_CASE_SENSITIVE', 'STARTS_WITH', 'STARTS_WITH_CASE_SENSITIVE', 
  // 'ENDS_WITH', 'ENDS_WITH_CASE_SENSITIVE', 'EQUAL', 'EQUAL_CASE_SENSITIVE', 'NULL', 'NOT_NULL' 
  // possible conditions for numeric filter: 'EQUAL', 'NOT_EQUAL', 'LESS_THAN', 'LESS_THAN_OR_EQUAL', 'GREATER_THAN', 'GREATER_THAN_OR_EQUAL', 'NULL', 'NOT_NULL
  dataAdapter: IDataAdapter,
  filterData: any
  hideable?: boolean
  hide?: boolean
  renderer?: void
  cellsRenderer?: void
  cellsFormat?: string
  align?: 'left' | 'center' | 'right'
  createFilterWidget?: void
  createFilterPanel?: void
  width?: number | string
  maxWidth?: number | string
  resizable?: boolean
  draggable?: boolean
  editable?: boolean
  className?: string
  cellsClassName?: string
  pinned?: boolean
}
