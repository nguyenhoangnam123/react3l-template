import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { ModelFilter } from "@react3l/react3l/core";

export class PostFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public content?: StringFilter = new StringFilter();
  public url?: StringFilter = new StringFilter();
  public discussionId?: StringFilter = new StringFilter();
  public creatorId?: IdFilter = new IdFilter();
}
