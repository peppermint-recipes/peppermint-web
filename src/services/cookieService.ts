export class CookieService {
  private userAccessToken: string

  constructor() {
    this.userAccessToken = '';
  }

  public setUserAccessToken(token: string) {
    this.userAccessToken = token;
  }

  public getUserAcessToken() {
    return this.userAccessToken;
  }
}
