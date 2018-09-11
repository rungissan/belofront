export class UserOld {
  public email: string;
  public username: string;
  public isLoggedIn: boolean;

  constructor(user?: any) {
    this.email = user ? user.email : '';
    this.username = user ? user.username : '';
    this.isLoggedIn = this.username ? true : false;
  }

}
