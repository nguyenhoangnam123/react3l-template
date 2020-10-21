import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class FieldFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public fieldTypeId?: IdFilter = new IdFilter();
  public menuId?: IdFilter = new IdFilter();
}