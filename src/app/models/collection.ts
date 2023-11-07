import {User} from "./user";
import {HiddenStatus} from "../enums/hiddenStatus";

export class Collection {
  id: number;
  user?: User;
  title: string;
  description?: string;
  backgroundImgLink?: string;
  hiddenStatus?: HiddenStatus;

  constructor(orig?: Collection) {
    this.id = 0;
    this.title = "Untitled Collection"
    if(orig?.id != null) {
      this.id = orig.id;
      this.user = orig.user;
      this.title = orig.title;
      this.description = orig.description;
      this.backgroundImgLink = orig.backgroundImgLink;
      this.hiddenStatus = orig.hiddenStatus;
    }
  }
}
