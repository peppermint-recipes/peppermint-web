import { Storable } from './Storable';

export interface ShoppingListItem {
  ingredient: string,
  unit: string,
  amount: number,
}

export interface ShoppingList extends Storable {
  items: ShoppingListItem[],
}
