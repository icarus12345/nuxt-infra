import { IConditions, IFilterMod, ISortMod } from "../interfaces";
import { IConditionDto } from "../interfaces/dto";

export class DataSourceMapper {
  static toDataSource(cond: IConditions, include?: string): IConditionDto {
    const pageSize = cond.endRow - cond.startRow;
    const pageNumber = cond.endRow / pageSize;
    const sort = cond.sortModel.map((sort: ISortMod) => `${sort.sort === 'desc' ? '-' : ''}${sort.colId.replace('attributes.', '')}`).join(',')
    const filter: { [colId: string]: string } = {};
    const filterSecond: { [colId: string]: string } = {};
    const operator: { [colId: string]: string } = {};
    const secondOperator: { [colId: string]: string } = {};
    let conditionOperator: string = ''
    for (const colId in cond.filterModel) {
      const column = colId.replace('attributes.', '');
      const filterModel = cond.filterModel[colId];
      const conditions = filterModel.conditions;
      if (conditions) {
        // multiple
        filter[column] = conditions[0].filterType === 'date' ? conditions[0].dateFrom! : conditions[0].filter!;
        operator[column] = conditions[0].type!;
        filterSecond[column] = conditions[1].filterType === 'date' ? conditions[1].dateFrom! : conditions[1].filter!;;
        secondOperator[column] = conditions[1].type!;
        conditionOperator = filterModel.operator!;
      } else {
        // single
        filter[column] = filterModel.filterType === 'date' ? filterModel.dateFrom! : filterModel.filter!;
        
        if (filterModel.type === 'inRange') {
          filterSecond[column] = String(filterModel.filterTo);
        }
        operator[column] = filterModel.type!;
      }
    }

    return {
      include,
      sort,
      filter,
      filterSecond,
      conditionOperator,
      operator,
      secondOperator,
      page: {
        number: pageNumber,
        size: pageSize
      }
    }
  }
}