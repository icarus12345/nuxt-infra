import { IEntity } from '@entities'

export interface IField {
  name: string
  type?: string // 'string', 'date', 'number', 'float', 'int' and 'bool'
  format?: string
  map?: string
}
export interface IDataSource<T = IEntity> {
  id?: string
  valueMember?: string
  displayMember?: string
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
  private records: any []
  private total: number
  constructor(private source: IDataSource<T>, options = {}) {}
  async bind(params: any) {
    const resource = await this.source.fetch(params)
    let records = getValueByPath(resource, this.source.root || 'data')
    const total = getValueByPath(resource, this.source.total || 'meta>page>total')
    records = this.parse(records)
    this.source.data = records
    return {
      records,
      total,
    };
  }
  parse(records: IEntity[] | IEntity) {
    if (records instanceof Array) {
      return records?.map((entity: IEntity) => this.parse(entity))
    }

    if (this.source.fields && typeof records === 'object') {
      const entity = records
      const row = {}
      this.source.fields.forEach(field => {
        row[field.name] = getValueByPath(entity, field.map || field.name)
      })
      return  row
    }

    return records
  }
}

export type FieldType = 'Number' | 'Checkbox' | 'Textbox' | 'Combobox' | 'DropdownList' | 'CheckList' | 'List' | 'Date' | 'TagsInput'
export type Field = {
  text?: string
  dataField?: string
  displayField?: string
  fieldType?: FieldType
  dataSource: IDataSource
  shape?: any
}
export type Column = Field & {
  sortable?: boolean
  filterable?: boolean
  filter?: any
  filterType?: FieldType
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

export type FieldSchema = {
  fields: Field[]
}
