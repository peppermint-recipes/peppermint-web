/* eslint-disable no-console */

import { Recipe } from '@/types/recipe';
import http from '../plugins/axios';

export async function loadAllRecipes() {
  try {
    const response = await http.get('/recipes');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function postRecipe(recipe: Recipe) {
  try {
    await http.post('/recipes', recipe);
  } catch (error) {
    console.log(error);
  }
}

export async function getRecipeById(id: string) {
  try {
    const response = await http.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);

    return {};
  }
}

export async function deleteRecipe(id:string) {
  try {
    await http.delete(`/recipes/${id}`);
  } catch (error) {
    console.log(error);
  }
}
