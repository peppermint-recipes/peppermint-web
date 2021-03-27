import { AxiosInstance } from 'axios';

export default class WebStore<StoreType, StoreTypeMultiple> {
  private baseUrl: string

  private apiClient: AxiosInstance

  constructor(readonly baseUrlIn: string, readonly apiClientIn: AxiosInstance) {
    this.baseUrl = baseUrlIn;
    this.apiClient = apiClientIn;
  }

  public async saveOne(data: StoreType) {
    const response = await this.apiClient.post(this.baseUrl, data);
    return response.data;
  }

  public async save(data: StoreType) {
    await this.apiClient.post(this.baseUrl, data);
  }

  public async updateOne(id: string, data: StoreType) {
    const response = await this.apiClient.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  public async get(): Promise<StoreTypeMultiple> {
    const response = await this.apiClient.get(this.baseUrl);
    return response.data;
  }

  public async delete(id: string): Promise<StoreType> {
    const response = await this.apiClient.delete(id);
    return response.data;
  }
}
