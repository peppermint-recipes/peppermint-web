import { Recipe } from './recipe';

export interface Day {
  breakfast: Array<Recipe>,
  lunch: Array<Recipe>,
  dinner: Array<Recipe>,
  snacks: Array<Recipe>,
}

export interface Week {
  monday: Day,
  tuesday: Day,
  wednesday: Day,
  thursday: Day,
  friday: Day,
  saturday: Day,
  sunday: Day,
}
