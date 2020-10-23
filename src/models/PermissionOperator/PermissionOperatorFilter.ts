import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PermissionOperatorFilter extends ModelFilter  {
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public fieldTypeId?: IdFilter = new IdFilter();
}
