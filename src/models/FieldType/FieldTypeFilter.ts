import { StringFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class FieldTypeFilter extends ModelFilter  {
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
}
