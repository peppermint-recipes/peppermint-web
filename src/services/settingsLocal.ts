import { Settings } from '@/types/settings';
import {
  FilesystemDirectory, FilesystemEncoding, Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

export default class SettingsLocal {
  private settingsFileName = 'settings.json';

  private settings = {} as Settings

  constructor() {
    const initialLoad = async () => {
      this.settings = await this.readLocalSettings();
    };

    initialLoad();
  }

  public getSettings(): Settings {
    return this.settings;
  }

  public async updateSettings(settings: Settings): Promise<void> {
    this.settings = settings;
    await this.writeLocalSettings(settings);
  }

  private async readLocalSettings(): Promise<Settings> {
    try {
      const file = await Filesystem.readFile({
        path: this.settingsFileName,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8,
      });

      return JSON.parse(file.data);
    } catch (error) {
      const fileDoesNotExistErrorMessage = 'File does not exist';

      if (error.message === fileDoesNotExistErrorMessage) {
        await this.writeLocalSettings(this.emptySettings);

        return this.emptySettings;
      }
      return this.emptySettings;
    }
  }

  private async writeLocalSettings(settings: Settings): Promise<void> {
    await Filesystem.writeFile({
      path: this.settingsFileName,
      data: JSON.stringify(settings),
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8,
    });
  }

  private emptySettings: Settings = {
    serverAddress: '',
    userId: 0,
  }
}
