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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        const test = error.request as XMLHttpRequest;
        console.log(test.status);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return [] as Type[];
    }
  }

  private readBody(xhr: any) {
    let data;
    if (!xhr.responseType || xhr.responseType === 'text') {
      data = xhr.responseText;
    } else if (xhr.responseType === 'document') {
      data = xhr.responseXML;
    } else {
      data = xhr.response;
    }
    return data;
  }

  public async delete(id: string): Promise<Type> {
    const response = await this.apiClient.delete(id);
    return response.data;
  }
}
