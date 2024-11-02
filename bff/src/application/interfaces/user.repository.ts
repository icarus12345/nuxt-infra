import { User, Role, Entity } from "@entities"
import { IResource } from "."

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
  startRow: number
  endRow: number
  sortModel: ISortMod[]
  filterModel: {[colId: string]: IFilterMod}
}


export interface IUserRepository {
  fetchUsers(cond: IConditions): Promise<IResource<User[]>>
}