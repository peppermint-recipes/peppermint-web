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
    if (!data) {
      return new Map() as unknown as StoreType;
    }
    console.log(data);
    // console.log(new Map(data));
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

      // console.log('test');
      console.log(file.data);
      // console.log(JSON.stringify(file.data));
      const parsed = JSON.parse(file.data);
      // console.log('parsed');
      console.log(parsed);
      console.log(new Map(parsed));
      return new Map(parsed);
    } catch (error) {
      const fileDoesNotExistErrorMessage = 'File does not exist';

      if (error.message === fileDoesNotExistErrorMessage) {
        await this.writeFile();
      }

      return new Map() as any;
    }
  }

  private async writeFile(data?: StoreType) {
    await Filesystem.writeFile({
      path: this.fileName,
      data: (data !== undefined) ? JSON.stringify(data) : JSON.stringify({}),
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8,
    });
  }
}
