/* eslint-disable no-console */
import { Recipe } from '@/types/recipe';
import {
  FilesystemDirectory, FilesystemEncoding, Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

export default class LocalShoppingList {
  private shoppingListFileName = 'shoppingList.json';

  private shoppingList = [] as Recipe[]

  constructor() {
    const initialLoad = async () => {
      this.shoppingList = await this.readLocalShoppingList();
    };

    initialLoad();
  }

  getShoppingList() {
    return this.shoppingList;
  }

  async addItemToShoppingList(recipe: Recipe) {
    this.shoppingList.push(recipe);
    await this.writeLocalShoppingList(this.shoppingList);
  }

  async addItemsToShoppingList(recipes: Recipe[]) {
    recipes.forEach((recipe) => this.shoppingList.push(recipe));
    await this.writeLocalShoppingList(this.shoppingList);
  }

  async deleteRecipe(id: string) {
    const filteredRecipes = this.shoppingList.filter((recipe) => recipe.id !== id);
    await this.writeLocalShoppingList(filteredRecipes);
    this.shoppingList = filteredRecipes;
  }

  async removeAllItems() {
    this.shoppingList = [];
    await this.writeLocalShoppingList(this.shoppingList);
  }

  async saveRecipe(recipe: Recipe) {
    this.shoppingList.push(recipe);
    await this.writeLocalShoppingList(this.shoppingList);
  }

  private async readLocalShoppingList() {
    try {
      const file = await Filesystem.readFile({
        path: this.shoppingListFileName,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8,
      });

      return JSON.parse(file.data);
    } catch (error) {
      const fileDoesNotExistErrorMessage = 'File does not exist';

      if (error.message === fileDoesNotExistErrorMessage) {
        await this.writeLocalShoppingList([]);

        return [];
      }
      return [];
    }
  }

  private async writeLocalShoppingList(recipes: Recipe[]) {
    await Filesystem.writeFile({
      path: this.shoppingListFileName,
      data: JSON.stringify(recipes),
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8,
    });
  }
}
