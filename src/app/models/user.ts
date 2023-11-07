import {HiddenStatus} from "../enums/hiddenStatus";


export class User {
  id: number = 0;
  username?: string;
  email?: string;
  pfpLink?: string;
  birthday?: Date;
  hiddenStatus?: HiddenStatus;

  constructor(orig?: User) {
    this.id = 0;
    if(orig?.id != null) {
      this.id = orig.id;
      this.username = orig.username;
      this.email = orig.email;
      this.pfpLink = orig.pfpLink;
      this.birthday = orig.birthday;
      this.hiddenStatus = orig.hiddenStatus;
    }
  }

}
