import { StringFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class MenuFilter extends ModelFilter  {
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public path?: StringFilter = new StringFilter();
}
