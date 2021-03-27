import { Storable } from './Storable';

export interface RecipeField {
  recipeId: string,
  name: string,
}

export interface Day {
  breakfast: Array<RecipeField>,
  lunch: Array<RecipeField>,
  dinner: Array<RecipeField>,
  snacks: Array<RecipeField>,
}

export interface Week extends Storable {
  calenderWeek: number,
  year: number,
  monday: Day,
  tuesday: Day,
  wednesday: Day,
  thursday: Day,
  friday: Day,
  saturday: Day,
  sunday: Day,
}
