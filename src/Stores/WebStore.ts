import { AxiosInstance } from 'axios';

export default class WebStore<Type> {
  private baseUrl: string

  private apiClient: AxiosInstance

  constructor(readonly baseUrlIn: string, readonly apiClientIn: AxiosInstance) {
    this.baseUrl = baseUrlIn;
    this.apiClient = apiClientIn;
  }

  public async saveOne(data: Type) {
    const response = await this.apiClient.post(this.baseUrl, data);
    if (response.data === null) {
      return [];
    }
    return response.data;
  }

  public async save(data: Type) {
    await this.apiClient.post(this.baseUrl, data);
  }

  public async updateOne(id: string, data: Type) {
    const response = await this.apiClient.put(this.baseUrl, data);
    if (response.data === null) {
      return [];
    }
    return response.data;
  }

  public async get(): Promise<Type[]> {
    try {
      const response = await this.apiClient.get(this.baseUrl);
      if (response.data === null) {
        return [] as Type[];
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return [] as Type[];
    }
  }

  public async delete(id: string): Promise<Type> {
    const response = await this.apiClient.delete(id);
    return response.data;
  }
}
