import { Not, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Equal, Between, Like } from 'typeorm';
import { FilterInput, SortInput } from 'src/graphql/types/common.input';
// import { FilterOperatorTypeEnum } from 'src/graphql/enums/filter_operator_type';

export const generateQueryByFilter = (filters?: FilterInput[]) => {
  const where = {};
  filters?.map((filter) => {
    switch (filter.operator) {
      case 'EQ':
        where[filter.field] = Equal(filter.value);
        break;
      case 'CONTAINS':
        where[filter.field] = Like(`%${filter.value}%`);
        // where[filter.field] = Raw((alias) => `${filter.field} ILIKE '%${filter.value}%'`);
        break;
      case 'NE':
        where[filter.field] = Not(filter.value);
        break;
      case 'GREATERTHAN':
        where[filter.field] = MoreThan(filter.value);
        break;
      case 'GREATERTHAN_EQ':
        where[filter.field] = MoreThanOrEqual(filter.value);
        break;
      case 'LESSTHAN':
        where[filter.field] = LessThan(filter.value);
        break;
      case 'LESSTHAN_EQ':
        where[filter.field] = LessThanOrEqual(filter.value);
        break;
      case 'BETWEEN': {
        const vals = filter.value.split(':');
        if (vals.length === 2) {
          where[filter.field] = Between(vals[0], vals[1]);
        }
        break;
      }
      default:
        break;
    }
    return true;
  });
  return where;
};

export const generateQueryBySort = (sorts?: SortInput[]) => {
  const order = {};
  if (sorts && sorts.length) {
    sorts.map((sort) => {
      order[sort.field] = sort.direction ?? 'DESC';
    });
  }
  return order;
};
