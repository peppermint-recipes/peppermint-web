/* eslint-disable no-console */
import { Recipe } from '@/types/recipe';
import {
  FilesystemDirectory, FilesystemEncoding, Plugins,
} from '@capacitor/core';

const { Filesystem } = Plugins;

export default class LocalRecipes {
  private recipeFilename = 'recipe.json';

  private recipes = [] as Recipe[]

  constructor() {
    const initialLoad = async () => {
      this.recipes = await this.readLocalRecipes();
    };

    initialLoad();
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipeById(id: string) {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  async deleteRecipe(id: string) {
    const filteredRecipes = this.recipes.filter((recipe) => recipe.id !== id);
    await this.writeLocalRecipes(filteredRecipes);
    this.recipes = filteredRecipes;
  }

  async saveRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    await this.writeLocalRecipes(this.recipes);
  }

  private async readLocalRecipes() {
    try {
      const file = await Filesystem.readFile({
        path: this.recipeFilename,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8,
      });

      return JSON.parse(file.data);
    } catch (error) {
      const fileDoesNotExistErrorMessage = 'File does not exist';

      if (error.message === fileDoesNotExistErrorMessage) {
        await this.writeLocalRecipes([]);
        return [];
      }
      return [];
    }
  }

  private async writeLocalRecipes(recipes: Recipe[]) {
    await Filesystem.writeFile({
      path: this.recipeFilename,
      data: JSON.stringify(recipes),
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8,
    });
  }
}
