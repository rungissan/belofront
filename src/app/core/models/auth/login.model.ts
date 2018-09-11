// import { environment as env } from '../../../../environments/environment';

export class LoginForm {
  public username: string;
  public password: string;

  constructor(loginForm: any) {
    this.username = loginForm.username || '';
    this.password = loginForm.password || '';
  }
}
