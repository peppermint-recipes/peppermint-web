import axios, { AxiosInstance } from 'axios';
import LocalStorageService from '../services/cookieService';

export default class AxiosHttpClient {
  public readonly http: AxiosInstance

  private readonly localStorageService: LocalStorageService

  constructor(options: {
    cookieService: LocalStorageService
  }) {
    this.localStorageService = options.cookieService;

    this.http = axios.create({
      baseURL: this.localStorageService.getServerAddress(),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.http.interceptors.request.use(
      (config) => {
        const conf = config;
        const token = `Bearer ${this.localStorageService.getUserAcessToken()}`;

        if (token) {
          conf.headers.Authorization = token;
        } else {
          delete this.http.defaults.headers.common.Authorization;
        }
        return conf;
      },
      (error) => Promise.reject(error),
    );
  }
}
