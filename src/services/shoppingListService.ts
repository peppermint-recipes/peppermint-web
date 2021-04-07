import { Recipe } from '@/types/recipe';
import { Capacitor } from '@capacitor/core';
import LocalShoppingList from './LocalShoppingList';
import http from '../plugins/axios';

const plattformIsNative = Capacitor?.isNative;

export default class ShoppingListService {
  localShoppingList = new LocalShoppingList()

  async getItems() {
    if (plattformIsNative) {
      return this.localShoppingList.getShoppingList();
    }
    const response = await http.get('/shoppingList');

    return response.data;
  }

  async addItem(recipe: Recipe) {
    if (plattformIsNative) {
      await this.localShoppingList.addItemToShoppingList(recipe);
    }
    const response = await http.post('/shoppingList', recipe);

    return response.data;
  }

  async addItems(recipes: Recipe[]) {
    if (plattformIsNative) {
      this.localShoppingList.addItemsToShoppingList(recipes);
    }

    recipes.forEach(async (recipe) => {
      if (recipe.id) {
        await http.post('/shoppingList', recipe);
      }
    });
  }

  async removeItem(id: string) {
    if (plattformIsNative) {
      await this.localShoppingList.deleteRecipe(id);
    }
    const response = await http.delete(`/shoppingList/${id}`);

    return response.data;
  }

  async removeAllItems() {
    if (plattformIsNative) {
      await this.localShoppingList.removeAllItems();
    }
    const recipeResponse = await http.get('/shoppingList');
    const recipes = recipeResponse.data;

    return Promise.all(recipes.forEach((recipe: Recipe) => {
      http.delete(`/shoppingList/${recipe.id}`);
    }));
  }
}
