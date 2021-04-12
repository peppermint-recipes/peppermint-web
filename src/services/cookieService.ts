export default class LocalStorageService {
  private readonly localStorage: Storage

  constructor() {
    this.localStorage = window.localStorage;
  }

  public setUserAccessToken(token: string) {
    this.localStorage.setItem('token', token);
  }

  public getUserAcessToken() {
    return this.localStorage.getItem('token');
  }

  public setServerAddress(serverAddress: string) {
    this.localStorage.setItem('serverAddress', serverAddress);
  }

  public getServerAddress(): string {
    const serverAddressFromLocalStorage = this.localStorage.getItem('serverAddress');

    if (!serverAddressFromLocalStorage) {
      return 'http://localhost:1337';
    }
    return serverAddressFromLocalStorage;
  }
}
