import {User} from "./user";
import {HiddenStatus} from "../enums/hiddenStatus";
import {Collection} from "./collection";

export class Entry {
  id: number;
  user?: User;
  collectionId: number;
  collection?: Collection;
  title?: string;
  createdDate?: Date;
  editedDate?: Date;
  text?: string;
  images?: string;
  hiddenStatus?: HiddenStatus;

  constructor(orig?: Entry) {
    this.id = 0;
    this.collectionId = 0;
    if(orig?.id != null) {
      this.id = orig.id;
      this.user = orig.user;
      this.collectionId = orig.collectionId;
      this.collection = orig.collection;
      this.title = orig.title;
      this.createdDate = orig.createdDate;
      this.editedDate = orig.editedDate;
      this.text = orig.text;
      this.images = orig.images;
      this.hiddenStatus = orig.hiddenStatus;
    }
  }
}
