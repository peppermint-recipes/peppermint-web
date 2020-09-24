import http from '../plugins/axios';

export const getItems = async () => {
  const response = await http.get('/shoppingList');

  return response.data;
};

export const addItem = async (recipe) => {
  const response = await http.post('/shoppingList', recipe);

  return response.data;
};

export const addItems = async (recipes) => {
  recipes.forEach((recipe) => {
    if (recipe.id) {
      addItem(recipe);
    }
  });
};

export const removeItem = async (id) => {
  const response = await http.delete(`/shoppingList/${id}`);

  return response.data;
};

export const removeAllItems = async () => {
  const recipeResponse = await http.get('/shoppingList');
  const recipes = recipeResponse.data;
  return Promise.all(recipes.forEach((recipe) => {
    http.delete(`/shoppingList/${recipe.id}`);
  }));
};
