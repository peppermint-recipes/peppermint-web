/* eslint-disable no-console */
import LocalStore from '@/Stores/LocalStore';
import WebStore from '@/Stores/WebStore';
import { Storable } from '@/types/Storable';
import { Capacitor } from '@capacitor/core';
import { Settings } from '../types/Settings';
import { SettingsLocalStore, SettingsWebStore } from './SettingsStore';

const plattformIsNative = Capacitor?.isNative;

export default class SettingsHandler<Type extends Storable> {
  private localStore: SettingsLocalStore;

  private webStore: SettingsWebStore;

  private currentSettings: Settings;

  constructor(options: {
    localStore: SettingsLocalStore,
    webStore: SettingsWebStore,
    currentSettings: Settings,

  }) {
    this.localStore = options.localStore;
    this.webStore = options.webStore;
    this.currentSettings = {
      serverAddress: 'string',
      userId: 'string',
      id: 'string',
      isDeleted: false,
      lastUpdated: new Date(),
    };
    this.sync();
  }

  async add(item: Settings) {
    let itemFromServer;
    try {
      itemFromServer = await this.webStore.saveOne(item);
      this.currentSettings = item;
    } catch (error) {
      console.log(error);
    }

    if (plattformIsNative) {
      if (!itemFromServer) {
        this.currentSettings = item;
      }
      await this.localStore.persist(this.currentSettings);
    }
  }

  public get(): Settings {
    return this.currentSettings;
  }

  public async update(id: string, item: Settings) {
    let updatedItemFromServer;
    try {
      updatedItemFromServer = await this.webStore.update(id, item);
      this.currentSettings = updatedItemFromServer;
    } catch (error) {
      console.log(error);
    }

    if (plattformIsNative) {
      if (!updatedItemFromServer) {
        this.currentSettings = item;
      }
      await this.localStore.persist(this.currentSettings);
    }
  }

  private async sync(): Promise<void> {
    const webSettings = await this.webStore.get();
    const localSettings = await this.localStore.read();

    if (localSettings.lastUpdated > webSettings.lastUpdated) {
      return await this.webStore.update(localSettings.id, localSettings);
    }
    return await this.localStore.persist(webSettings);
  }
}
