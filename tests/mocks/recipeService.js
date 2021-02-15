export const createRecipe = async (recipe) => {
  const createdRecipe = {
    ...recipe,
    id: 1,
  };

  return createdRecipe;
};

export const getAllRecipes = async () => [
  {
    calories: 520,
    name: 'Test1',
    yield: 2,
    activeTime: '1h',
    totalTime: '1,5h',
    ingredients: '1 Banana',
    instructions: '1.: cook',
    id: 1,
  },
  {
    calories: 671,
    name: 'Test2',
    yield: 1,
    activeTime: '30 min',
    totalTime: '1h',
    ingredients: '1 Banana',
    instructions: '1.: cook',
    id: 2,
  },
  {
    calories: 52,
    name: 'Test3',
    yield: 5,
    activeTime: '5 min',
    totalTime: '129 min',
    ingredients: '1 Banana',
    instructions: '1.: cook',
    id: 3,
  },
  {
    calories: 1873,
    name: 'Test4',
    yield: 12,
    activeTime: '1h',
    totalTime: '1h',
    ingredients: '1 Banana',
    instructions: '1.: cook',
    id: 4,
  },
  {
    calories: 3,
    name: 'Test5',
    yield: 14,
    activeTime: '2h',
    totalTime: '3h',
    ingredients: '1 Banana',
    instructions: '1.: cook',
    id: 5,
  },
];

export const getRecipeById = async (id) => ({
  calories: 420,
  name: 'Test1',
  yield: '2',
  activeTime: '20 min',
  totalTime: '1h',
  ingredients: '1 Banana',
  instructions: '1.: cook',
  id,
});

export const deleteRecipe = async (id) => `deleted ${id}`;
