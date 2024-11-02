export interface IConditionDto {
  include?: string
  page: {
    number: number
    size: number
  }
  sort: string
  filter?: { [colId: string]: string }
  conditionOperator?: string
  filterSecond?: { [colId: string]: string }
  operator?: { [colId: string]: string }
  secondOperator?: { [colId: string]: string }
  
}