export interface IConditionDto {
  include?: string
  page: {
    number: number
    size: number
  }
  sort?: string
  filter?: { [colId: string]: string | number | boolean | undefined | string[] | number[] }
  conditionOperator?: string
  operator?: { [colId: string]: string }
  filter0?: { [colId: string]: string | number | boolean | string[] | number[] }
  operator0?: { [colId: string]: string }
  filter2?: { [colId: string]: string | number | boolean | string[] | number[] }
  operator2?: { [colId: string]: string }
  
}