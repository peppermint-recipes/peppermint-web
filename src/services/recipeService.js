import http from '../plugins/axios';

export const createRecipe = async (recipe) => {
  const response = await http.post('/recipes', recipe);

  return response.data;
};

export const getAllRecipes = async () => {
  const response = await http.get('/recipes');

  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await http.get(`/recipes/${id}`);

  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await http.delete(`/recipes/${id}`);

  return response.data;
};
