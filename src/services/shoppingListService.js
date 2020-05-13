import http from '../plugins/axios';

export const getItems = async () => {
  const response = await http.get('/shoppingList');

  return response.data;
};

export const addItem = async (recipe) => {
  const response = await http.post('/shoppingList', recipe);

  return response.data;
};

export const removeItem = async (id) => {
  const response = await http.delete(`/shoppingList/${id}`);

  return response.data;
};

export const removeAllItems = async () => {
  const response = await http.delete('/shoppingList');

  return response.data;
};
