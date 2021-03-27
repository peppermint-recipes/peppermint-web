import {
  FilesystemDirectory, FilesystemEncoding, Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

export default class localStore<StoreType> {
  private fileName: string

  constructor(fileNameIn: string) {
    this.fileName = fileNameIn;
  }

  public async read(): Promise<StoreType> {
    const data = await this.readFile();
    return data;
  }

  public async persist(data: StoreType) {
    await this.writeFile(data);
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

  private async writeFile(data?: StoreType) {
    await Filesystem.writeFile({
      path: this.fileName,
      data: (data !== undefined) ? JSON.stringify(data) : '',
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
  }
}
