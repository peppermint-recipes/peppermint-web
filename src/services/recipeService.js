import http from '../plugins/axios';

const createRecipe = async (recipe) => {
  console.log(recipe);

  const response = await http.post('/recipes', recipe);

  return response;
};

export default createRecipe;
