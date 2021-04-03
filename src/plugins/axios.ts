import axios, { AxiosInstance } from 'axios';
import { CookieService } from '../services/cookieService';

export default class AxiosHttpClient {
  public readonly http: AxiosInstance

  private readonly cookieService: CookieService

  constructor(options: {
    cookieService: CookieService
  }) {
    this.http = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.cookieService = options.cookieService;

    this.http.interceptors.request.use(
      (config) => {
        const conf = config;

        const token = `Bearer ${this.cookieService.getUserAcessToken()}`;
        console.log(token);

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
