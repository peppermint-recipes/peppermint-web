import http from '../plugins/axios';

export const createRecipe = async (recipe) => {
  const response = await http.post('/recipes', recipe);

  return response;
};

export const getAllRecipes = async () => {
  const response = await http.get('/recipes');

  return response.data;
};
