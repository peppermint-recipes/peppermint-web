import http from '../plugins/axios';

export const createRecipe = async (recipe) => {
  const response = await http.post('/recipe', recipe);

  return response.data.recipe;
};

export const getAllRecipes = async () => {
  const response = await http.get('/recipe');

  console.log(response);

  return response.data.recipes;
};

export const getRecipeById = async (id) => {
  const response = await http.get(`/recipe/${id}`);

  return response.data.recipe;
};

export const deleteRecipe = async (id) => {
  const response = await http.delete(`/recipe/${id}`);

  return response.data.recipe;
};
