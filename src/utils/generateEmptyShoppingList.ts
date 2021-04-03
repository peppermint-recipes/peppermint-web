import { ShoppingList } from '@/types/ShoppingList';
import generateTemporaryId from './generateTemporaryId';

export default function generateEmptyShoppingList(): ShoppingList {
  return {
    id: generateTemporaryId(),
    userId: process.env.VUE_APP_USER_ID,
    isDeleted: false,
    lastUpdated: new Date(),
    items: [],
  };
}
