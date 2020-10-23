import { Model } from "@react3l/react3l/core";
import { AppUser } from "models/AppUser";
import { Moment } from "moment";

export class Post extends Model {
  id?: number;
  content?: string;
  discussionId?: string;
  creatorId?: number;
  createdAt?: Moment;
  upatedAt?: Moment;
  creator?: AppUser;
  comments?: any[];
  url?: string;
  isOwner?: boolean;
  isPopup?: boolean;
}
