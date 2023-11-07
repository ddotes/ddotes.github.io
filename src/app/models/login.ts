export class Login {
  id : number;
  email : string;
  pass : string;
  oldPass? : string;
  userId: number;

  constructor(orig?: Login) {
    this.id = 0;
    this.email = "";
    this.pass = "";
    this.oldPass = "";
    this.userId = 0;
    if(orig?.id != null) {
      this.id = orig.id;
      this.email = orig.email;
      this.pass = orig.pass;
      this.oldPass = orig.oldPass;
      this.userId = orig.userId;
    }
  }

}
