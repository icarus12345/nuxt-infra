import { IDataSource, type FieldSchema, type Column } from "@interfaces"
export interface ISchema {
  name: string
  description: string
  source: IDataSource
  columns: Column[]
  schema: FieldSchema
  permissions: Record<string, string>
} 