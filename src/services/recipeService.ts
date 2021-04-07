/* eslint-disable no-console */
import { Recipe } from '@/types/recipe';
import { Capacitor } from '@capacitor/core';
import LocalRecipes from './LocalRecipes';
import * as recipeApi from './recipeApi';

const plattformIsNative = Capacitor?.isNative;

export default class RecipeService {
  localRecipes = new LocalRecipes();

  recipes = [];

  async createRecipe(recipe: Recipe) {
    if (plattformIsNative) {
      await this.localRecipes.saveRecipe(recipe);
    }

    await recipeApi.postRecipe(recipe);
  }

  async getAllRecipes() {
    if (plattformIsNative) {
      return this.localRecipes.getRecipes();
    }
    return recipeApi.loadAllRecipes();
  }

  async getRecipeById(id: string) {
    if (plattformIsNative) {
      return this.localRecipes.getRecipeById(id);
    }

    return recipeApi.getRecipeById(id);
  }

  async deleteRecipe(id: string) {
    if (plattformIsNative) {
      this.localRecipes.deleteRecipe(id);
    } else {
      recipeApi.deleteRecipe(id);
    }
  }
}
