/* eslint-disable no-console */
import LocalStore from '@/Stores/LocalStore';
import WebStore from '@/Stores/WebStore';
import { Recipe } from '@/types/Recipe';
import { Capacitor } from '@capacitor/core';

const plattformIsNative = Capacitor?.isNative;

type Id = string
type RecipeMap = Map<Id, Recipe>

type Differences = {
  new: Recipe[],
  updated: Recipe[],
}

function getDifferences(serverRecipes: RecipeMap, localRecipes: RecipeMap) {
  const localRecipesCopy = new Map(localRecipes);

  const serverDifference: Differences = {
    new: [],
    updated: [],
  };

  const localDifference: Differences = {
    new: [],
    updated: [],
  };

  serverRecipes.forEach((serverRecipe) => {
    const localRecipe = localRecipesCopy.get(serverRecipe.id);

    if (!localRecipe) {
      localDifference.new.push(serverRecipe);
      return;
    }

    // check correct time checks
    if (localRecipe) {
      if (serverRecipe.lastUpdated > localRecipe.lastUpdated) {
        localDifference.updated.push(serverRecipe);
      } else if (serverRecipe.lastUpdated < localRecipe.lastUpdated) {
        serverDifference.updated.push(localRecipe);
      }
      localRecipesCopy.delete(localRecipe.id);
    }
  });

  const array = Array.from(localRecipesCopy.values());
  serverDifference.new.push(...array);

  return {
    serverDifference,
    localDifference,
  };
}
export default class RecipeService {
  private recipeLocalStore: LocalStore<RecipeMap>;

  private recipeWebStore: WebStore<Recipe, RecipeMap>;

  private recipes: RecipeMap;

  constructor(options: {
    recipeLocalStore: LocalStore<RecipeMap>,
    recipeWebStore: WebStore<Recipe, RecipeMap>,
  }) {
    this.recipeLocalStore = options.recipeLocalStore;
    this.recipeWebStore = options.recipeWebStore;
    this.recipes = new Map();
    this.sync();
  }

  async addRecipe(recipe: Recipe) {
    let recipeFromServer;
    try {
      recipeFromServer = await this.recipeWebStore.saveOne(recipe);
    } catch (error) {
      console.log(error);
    }

    if (plattformIsNative) {
      if (recipeFromServer) {
        this.recipes.set(recipeFromServer.id, recipeFromServer);
      } else {
        this.recipes.set(recipe.id, recipe);
      }
      await this.recipeLocalStore.persist(this.recipes);
    }
  }

  public getRecipes(): Recipe[] {
    const activeRecipes: Recipe[] = [];
    this.recipes.forEach((recipe) => {
      if (!recipe.isDeleted) {
        activeRecipes.push(recipe);
      }
    });

    return activeRecipes;
  }

  public getRecipeById(id: string): Recipe | undefined {
    return this.recipes.get(id);
  }

  async deleteRecipe(id: string) {
    let recipeToDelete = this.recipes.get(id);

    if (!recipeToDelete) {
      return;
    }

    recipeToDelete.isDeleted = true;

    try {
      recipeToDelete = await this.recipeWebStore.delete(id);
    } catch (error) {
      console.log(error);
    }

    this.recipes.set(recipeToDelete.id, recipeToDelete);

    if (plattformIsNative) {
      this.recipeLocalStore.persist(this.recipes);
    }
  }

  private async sync() {
    const webRecipes = await this.recipeWebStore.get();
    const localRecipes = await this.recipeLocalStore.read();

    const {
      serverDifference,
      localDifference,
    } = getDifferences(webRecipes, localRecipes);

    const createdRecipes = await Promise.all(
      serverDifference.new.map((recipe) => this.recipeWebStore.saveOne(recipe)),
    );
    const updatedRecipes = await Promise.all(
      serverDifference.updated.map((recipe) => this.recipeWebStore.updateOne(recipe.id, recipe)),
    );

    const syncedRecipes: RecipeMap = new Map();

    this.addRecipesToRecipeMap(createdRecipes, syncedRecipes);
    this.addRecipesToRecipeMap(updatedRecipes, syncedRecipes);
    this.addRecipesToRecipeMap(localDifference.new, syncedRecipes);
    this.addRecipesToRecipeMap(localDifference.updated, syncedRecipes);

    this.recipes = syncedRecipes;

    this.recipeLocalStore.persist(this.recipes);
  }

  private addRecipesToRecipeMap(recipes: Recipe[], recipeMap: RecipeMap) {
    recipes.forEach((recipe) => recipeMap.set(recipe.id, recipe));
  }
}
