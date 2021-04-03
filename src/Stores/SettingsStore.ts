import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { AxiosInstance } from 'axios';
import { Settings } from '../types/Settings';

export class SettingsWebStore {
  private baseUrl: string

  private apiClient: AxiosInstance

  constructor(readonly baseUrlIn: string, readonly apiClientIn: AxiosInstance) {
    this.baseUrl = baseUrlIn;
    this.apiClient = apiClientIn;
  }

  public async saveOne(data: Settings) {
    const response = await this.apiClient.post(this.baseUrl, data);
    return response.data;
  }

  public async save(data: Settings) {
    await this.apiClient.post(this.baseUrl, data);
  }

  public async update(id: string, data: Settings) {
    const response = await this.apiClient.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  public async get(): Promise<Settings> {
    const response = await this.apiClient.get(this.baseUrl);
    return response.data;
  }

  public async delete(id: string): Promise<Settings> {
    const response = await this.apiClient.delete(id);
    return response.data;
  }
}

export class SettingsLocalStore {
  private fileName: string

  constructor(fileNameIn: string) {
    this.fileName = fileNameIn;
  }

  public async read(): Promise<Settings> {
    const data = await this.readFile();
    return data;
  }

  public async persist(data: Settings): Promise<void> {
    return await this.writeFile(data);
  }

  private async readFile() {
    try {
      const file = await Filesystem.readFile({
        path: this.fileName,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
      });

      return JSON.parse(file.data);
    } catch (error) {
      const fileDoesNotExistErrorMessage = 'File does not exist';

      if (error.message === fileDoesNotExistErrorMessage) {
        await this.writeFile();
      }
      return [];
    }
  }

  private async writeFile(data?: Settings): Promise<any> {
    return await Filesystem.writeFile({
      path: this.fileName,
      data: (data !== undefined) ? JSON.stringify(data) : '',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
  }
}
