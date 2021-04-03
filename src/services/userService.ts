import { Capacitor } from '@capacitor/core';

import { AxiosInstance } from 'axios';
import { User } from '../types/User';
import LocalStorageService from './cookieService';

const plattformIsMobile = Capacitor?.isNative;

export default class UserService {
  private readonly apiClient: AxiosInstance

  constructor(options: {
    apiClient: AxiosInstance
    accessToken: string

  }) {
    this.apiClient = options.apiClient;
  }

  public loginUser = async (user: User) => {
    try {
      // TODO: plain body instead of form-data?
      const bodyFormData = new FormData();
      bodyFormData.append('username', user.name);
      bodyFormData.append('password', user.password);
      const response = await this.apiClient.post('/login', bodyFormData);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('couldn\'t login');
      }
      throw new Error(error.response.data.status);
    }
  };

  public registerUser = async (user: User) => {
    try {
      const response = await this.apiClient.post('/register', user);

      return response.data.user;
    } catch (error) {
      if (!error.response) {
        console.log(error);
        throw new Error('couldn\'t create user');
      }
      throw new Error(error.response.data.status);
    }
  };
}
