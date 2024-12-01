import { IAttribute, IEntity } from "@entities"

export interface ISortMod {
  colId: string
  sort: 'asc' | 'desc'
}

export interface IFilterMod {
  filter?: string
  dateFrom?: string
  dateTo?: string
  filterTo?: string
  conditions?: IFilterMod[]
  filterType: string // "text"
  type?: string // "contains"
  operator?: string
}

export interface IConditions {
  startRow?: number
  endRow?: number
  sortModel?: ISortMod[]
  filterModel?: {[colId: string]: IFilterMod}
  archived?: boolean
  include?: string,
  params?: {[key: string]: any}
}

export interface IResource<T> {
  meta?: {
    page: {
      total: number
    }
  }
  data: T,
  included?: any,
  relationships?: IRelationships,
}

export type IRelationships = Record<string, IResource<IEntity>>

export interface IResourceList<T = IEntity> {
  meta?: {
    page: {
      total: number
    }
  }
  data: T[],
  included: IEntity[],
}

export interface IRepository<T = IEntity> {
  fetch(cond: IConditions): Promise<IResourceList<T>>
  save(entity: T): Promise<T>
  post(entity: T): Promise<T>
  patch(entity: T): Promise<T>
  delete(id: string): Promise<boolean>
}