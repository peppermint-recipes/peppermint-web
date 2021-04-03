import { Day } from '@/types/Week';

export default function generateEmptyDayOfWeekplan(): Day {
  return {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  };
}
