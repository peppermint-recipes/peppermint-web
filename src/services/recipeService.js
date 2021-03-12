import http from '../plugins/axios';

export const createRecipe = async (recipe) => {
  const response = await http.post('/recipes', recipe);

  return response.data;
};

export const getAllRecipes = async () => {
  try {
    const response = await http.get('/recipes');
    return response.data;
  } catch (error) {
    /* eslint-disable no-console */
    // Error 😨
    if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
      console.log(JSON.parse(error.response.data));
      console.log(JSON.parse(error.response.status));
      console.log(JSON.parse(error.response.headers));
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', JSON.parse(error.message));
    }
    console.log(error);
  }
  return [];
};

export const getRecipeById = async (id) => {
  const response = await http.get(`/recipes/${id}`);

  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await http.delete(`/recipes/${id}`);

  return response.data;
};
