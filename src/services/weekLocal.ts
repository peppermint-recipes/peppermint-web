import { Week, Day } from '@/types/week';
import {
  FilesystemDirectory, FilesystemEncoding, Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

export default class weekLocal {
  private weekFileName = 'week.json';

  private week = {} as Week

  constructor() {
    const initialLoad = async () => {
      this.week = await this.readLocalWeek();
    };

    initialLoad();
  }

  getWeek() {
    return this.week;
  }

  async updateWeek(week: Week) {
    this.week = week;
    await this.writeLocalWeek(week);
  }

  private async readLocalWeek() {
    try {
      const file = await Filesystem.readFile({
        path: this.weekFileName,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8,
      });

      return JSON.parse(file.data);
    } catch (error) {
      const fileDoesNotExistErrorMessage = 'File does not exist';

      if (error.message === fileDoesNotExistErrorMessage) {
        await this.writeLocalWeek({
          monday: this.emptyDay,
          tuesday: this.emptyDay,
          wednesday: this.emptyDay,
          thursday: this.emptyDay,
          friday: this.emptyDay,
          saturday: this.emptyDay,
          sunday: this.emptyDay,
        });

        return [];
      }
      return [];
    }
  }

  private async writeLocalWeek(week: Week) {
    await Filesystem.writeFile({
      path: this.weekFileName,
      data: JSON.stringify(week),
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8,
    });
  }

  private emptyDay: Day = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  }
}
