import { Week } from '@/types/Week';
import dayjs from 'dayjs';
import generateEmptyDayOfWeekplan from './generateEmptyDay';
import generateTemporaryId from './generateTemporaryId';

export default function generateEmptyWeek(): Week {
  return {
    id: generateTemporaryId(),
    userId: process.env.VUE_APP_USER_ID,
    isDeleted: false,
    lastUpdated: new Date(),
    calendarWeek: dayjs().week(),
    year: dayjs().year(),
    monday: generateEmptyDayOfWeekplan(),
    tuesday: generateEmptyDayOfWeekplan(),
    wednesday: generateEmptyDayOfWeekplan(),
    thursday: generateEmptyDayOfWeekplan(),
    friday: generateEmptyDayOfWeekplan(),
    saturday: generateEmptyDayOfWeekplan(),
    sunday: generateEmptyDayOfWeekplan(),
  };
}
