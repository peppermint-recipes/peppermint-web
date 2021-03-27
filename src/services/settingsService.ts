import { Capacitor } from '@capacitor/core';
import { Settings } from '@/types/settings';
import SettingsLocal from './settingsLocal';

const plattformIsNative = Capacitor?.isNative;

export default class SettingsService {
  localSettings = new SettingsLocal();

  public async updateSettings(settings: Settings) {
    if (plattformIsNative) {
      return this.localSettings.updateSettings(settings);
    }

    return;
  }

  public async getSettings(): Promise<Settings> {
    return this.localSettings.getSettings();
  }
}
