import { IConditions, IFilterMod, ISortMod } from "../interfaces";
import { IConditionDto } from "../interfaces/dto/conditions";

/**
  "=",
  "<",
  ">",
  "<=",
  ">=",
  "<>",
  "!=",
  "<=>",
  "like",
  "like binary",
  "not like",
  "ilike",
  "&",
  "|",
  "^",
  "<<",
  ">>",
  "&~",
  "is",
  "is not",
  "rlike",
  "not rlike",
  "regexp",
  "not regexp",
  "~",
  "~*",
  "!~",
  "!~*",
  "similar to",
  "not similar to",
  "not ilike",
  "~~*",
  "!~~*"
 */
export class DataSourceMapper {
  static toDataSource(cond: IConditions): Nullable<IConditionDto> {
    if (!cond) {
      return undefined
    }
    const pageSize = Number(cond.endRow || 1000) - Number(cond.startRow || 0);
    const pageNumber = Number(cond.endRow || 1000) / pageSize;
    const sort = cond.sortModel?.map((sort: ISortMod) => `${sort.sort === 'desc' ? '-' : ''}${sort.colId.replace('attributes.', '')}`).join(',') || undefined
    const filter: { [colId: string]: string | number | boolean | undefined } = {
      archived: cond.archived
    };
    const operator: { [colId: string]: string } = {};
    const filter2: { [colId: string]: string | number | boolean } = {};
    const operator2: { [colId: string]: string } = {};
    let conditionOperator: string | undefined
    for (const colId in cond.filterModel) {
      const column = colId.replace('attributes.', '');
      const filterModel = cond.filterModel[colId];
      const conditions = filterModel.conditions;
      if (conditions) {
        // multiple
        filter[column] = conditions[0].filterType === 'date' ? conditions[0].dateFrom! : conditions[0].filter!;
        operator[column] = conditions[0].type!;
        filter2[column] = conditions[1].filterType === 'date' ? conditions[1].dateFrom! : conditions[1].filter!;;
        operator2[column] = conditions[1].type!;
        conditionOperator = filterModel.operator!;
      } else if (['true', 'false'].includes(filterModel.type!)) {
        filter[column] = filterModel.type!
      } else {
        // single
        filter[column] = filterModel.filterType === 'date' ? filterModel.dateFrom! : filterModel.filter!;
        
        if (filterModel.type === 'inRange') {
          filter2[column] = String(filterModel.filterTo);
        }
        operator[column] = filterModel.type!;
      }
    }

    return {
      include: cond.include,
      sort,
      filter,
      operator,
      conditionOperator,
      filter2,
      operator2,
      page: {
        number: pageNumber,
        size: pageSize
      },
      ...cond.params
    }
  }
}