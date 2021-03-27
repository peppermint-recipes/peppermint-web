import { Capacitor } from '@capacitor/core';

import LocalStore from '@/Stores/LocalStore';
import WebStore from '@/Stores/WebStore';
import { Week } from '@/types/Week';

const plattformIsMobile = Capacitor?.isNative;

type Id = string;
type WeekMap = Map<Id, Week>;

type Differences = {
  new: Week[],
  updated: Week[],
}

export default class WeekService {
  weekLocalStore: LocalStore<WeekMap>;

  weekWebStore: WebStore<Week, WeekMap>;

  weeks: WeekMap;

  currentWeek: Week | undefined;

  constructor(options: {
    weekLocalStore: LocalStore<WeekMap>,
    weekWebStore: WebStore<Week, WeekMap>;
  }) {
    this.weekLocalStore = options.weekLocalStore;
    this.weekWebStore = options.weekWebStore;
    this.weeks = new Map();
    this.sync();
  }

  async createWeek(week: Week) {
    let weekFromServer;

    try {
      weekFromServer = await this.weekWebStore.saveOne(week);
    } catch (error) {
      console.log(error);
    }

    if (plattformIsMobile) {
      if (weekFromServer) {
        this.weeks.set(weekFromServer.id, week);
      } else {
        this.weeks.set(week.id, week);
      }
    }
  }

  async updateWeek(week: Week) {
    const updatedWeek = await this.weekWebStore.updateOne(week.id, week);

    this.weeks.set(updatedWeek.id, updatedWeek);

    if (plattformIsMobile) {
      return this.weekLocalStore.persist(this.weeks);
    }

    return updatedWeek;
  }

  getWeeks() {
    return this.weeks;
  }

  getCurrentWeek() {
    if (!this.currentWeek) {
      let currentWeek: Week = this.weeks.values().next().value;

      this.weeks.forEach((week) => {
        if (week.year > currentWeek.year
          || ((week.year === currentWeek.year) && week.calenderWeek > currentWeek.calenderWeek)
        ) {
          currentWeek = week;
        }
      });
      this.currentWeek = currentWeek;
    }

    return this.currentWeek;
  }

  private async sync() {
    const webWeeks = await this.weekWebStore.get();
    const localWeeks = await this.weekLocalStore.read();

    const {
      serverDifference,
      localDifference,
    } = this.getDifferences(webWeeks, localWeeks);

    const createdWeeks = await Promise.all(
      serverDifference.new.map((recipe) => this.weekWebStore.saveOne(recipe)),
    );
    const updatedWeeks = await Promise.all(
      serverDifference.updated.map((recipe) => this.weekWebStore.updateOne(recipe.id, recipe)),
    );

    const syncedRecipes: WeekMap = new Map();

    this.addWeeksToWeekMap(createdWeeks, syncedRecipes);
    this.addWeeksToWeekMap(updatedWeeks, syncedRecipes);
    this.addWeeksToWeekMap(localDifference.new, syncedRecipes);
    this.addWeeksToWeekMap(localDifference.updated, syncedRecipes);

    this.weeks = syncedRecipes;

    this.weekLocalStore.persist(this.weeks);
  }

  private addWeeksToWeekMap(weeks: Week[], weekMap: WeekMap) {
    weeks.forEach((week) => weekMap.set(week.id, week));
  }

  private getDifferences(serverWeeks: WeekMap, localWeek: WeekMap) {
    const localWeekCopy = new Map(localWeek);

    const serverDifference: Differences = {
      new: [],
      updated: [],
    };

    const localDifference: Differences = {
      new: [],
      updated: [],
    };

    serverWeeks.forEach((serverRecipe) => {
      const localRecipe = localWeekCopy.get(serverRecipe.id);

      if (!localRecipe) {
        localDifference.new.push(serverRecipe);
        return;
      }

      // check correct time checks
      if (localRecipe) {
        if (serverRecipe.lastUpdated > localRecipe.lastUpdated) {
          localDifference.updated.push(serverRecipe);
        } else if (serverRecipe.lastUpdated < localRecipe.lastUpdated) {
          serverDifference.updated.push(localRecipe);
        }
        localWeekCopy.delete(localRecipe.id);
      }
    });

    const array = Array.from(localWeekCopy.values());
    serverDifference.new.push(...array);

    return {
      serverDifference,
      localDifference,
    };
  }
}
