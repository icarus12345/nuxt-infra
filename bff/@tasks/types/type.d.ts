import type { ColumnDef as BaseColumnDef } from '@tanstack/vue-table'
export type ColumnDef<T> = BaseColumnDef<T> & {
  filterType?: string
  filterData?: any
}