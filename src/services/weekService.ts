import { Capacitor } from '@capacitor/core';
import { Week } from '@/types/week';
import http from '../plugins/axios';
import WeekLocal from './weekLocal';

const plattformIsMobile = Capacitor?.isNative;

export default class WeekService {
  localWeek = new WeekLocal();

  week = {} as Week;

  async updateWeek(week: Week) {
    if (plattformIsMobile) {
      return this.localWeek.updateWeek(week);
    }
    const response = await http.put('/week', week);

    return response.data;
  }

  async getWeek() {
    if (plattformIsMobile) {
      return this.localWeek.getWeek();
    }
    const response = await http.get('/week');

    return response.data as Week;
  }
}
