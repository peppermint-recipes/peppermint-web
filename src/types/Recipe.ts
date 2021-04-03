import { Storable } from './Storable';

export interface Recipe extends Storable {
  name: string,
  calories: number,
  activeTime: number,
  totalTime: number,
  ingredients: string,
  instructions: string,
  servings: number,
  categories: string[],
}
