/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import LocalStore from '@/Stores/LocalStore';
import WebStore from '@/Stores/WebStore';
import { Storable } from '@/types/Storable';
import { Capacitor } from '@capacitor/core';

const plattformIsNative = Capacitor?.isNative;

export default class StoreHandler<Type extends Storable> {
  private localStore: LocalStore<Map<string, Type>>;

  private webStore: WebStore<Type, Type[]>;

  private items: Map<string, Type>;

  constructor(options: {
    localStore: LocalStore<Map<string, Type>>,
    webStore: WebStore<Type, Type[]>,
  }) {
    this.localStore = options.localStore;
    this.webStore = options.webStore;
    this.items = new Map();
  }

  async add(item: Type) {
    item.userId = process.env.VUE_APP_USER_ID;
    let itemFromServer;
    try {
      const itemCopy = { ...item };
      itemCopy.id = '';
      itemFromServer = await this.webStore.saveOne(itemCopy);
      this.items.set(itemFromServer.id, itemFromServer);
    } catch (error) {
      console.log(error);
    }

    if (plattformIsNative) {
      if (!itemFromServer) {
        this.items.set(item.id, item);
      }
      await this.localStore.persist(this.items);
    }
  }

  public getAll(): Type[] {
    const notDeletedItems: Type[] = [];
    this.items.forEach((item) => {
      if (!item.isDeleted) {
        notDeletedItems.push(item);
      }
    });

    return notDeletedItems;
  }

  public async update(id: string, item: Type) {
    item.userId = process.env.VUE_APP_USER_ID;
    let updatedItemFromServer;
    try {
      updatedItemFromServer = await this.webStore.updateOne(id, item);
      this.items.set(updatedItemFromServer.id, updatedItemFromServer);
    } catch (error) {
      console.log(error);
    }

    if (plattformIsNative) {
      if (!updatedItemFromServer) {
        this.items.set(item.id, item);
      }
      await this.localStore.persist(this.items);
    }
  }

  public getById(id: string): Type | undefined {
    return this.items.get(id);
  }

  public async delete(id: string) {
    let itemToDelete = this.items.get(id);

    if (!itemToDelete) {
      return;
    }

    itemToDelete.isDeleted = true;

    try {
      itemToDelete = await this.webStore.delete(id);
    } catch (error) {
      console.log(error);
    }

    this.items.set(itemToDelete.id, itemToDelete);

    if (plattformIsNative) {
      this.localStore.persist(this.items);
    }
  }

  public async sync() {
    if (!plattformIsNative) {
      const webRecipesAsArray = await this.webStore.get();
      const webRecipes = new Map();
      webRecipesAsArray.forEach((recipe) => webRecipes.set(recipe.id, recipe));
      this.items = webRecipes;
      return;
    }

    const webRecipesAsArray = await this.webStore.get();
    const localRecipes = await this.localStore.read();

    const webRecipes = new Map();
    webRecipesAsArray.forEach((recipe) => webRecipes.set(recipe.id, recipe));

    console.log(JSON.stringify([...webRecipes]));
    console.log(JSON.stringify([...localRecipes]));

    const {
      serverDifference,
      localDifference,
    } = this.getDifferences(webRecipes, localRecipes);

    const createdItems = await Promise.all(
      serverDifference.new.map((recipe) => this.webStore.saveOne(recipe)),
    );
    const updatedItems = await Promise.all(
      serverDifference.updated.map((recipe) => this.webStore.updateOne(recipe.id, recipe)),
    );

    const syncedItems: Map<string, Type> = new Map();

    this.addItemsToMap(createdItems, syncedItems);
    this.addItemsToMap(updatedItems, syncedItems);
    this.addItemsToMap(localDifference.new, syncedItems);
    this.addItemsToMap(localDifference.updated, syncedItems);

    this.items = syncedItems;

    this.localStore.persist(this.items);
  }

  private getDifferences(serverRecipes: Map<string, Type>, localRecipes: Map<string, Type>) {
    const localRecipesCopy = new Map(localRecipes);
    type Differences = {
      new: Type[],
      updated: Type[],
    }

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

  private addItemsToMap(recipes: Type[], recipeMap: Map<string, Type>) {
    recipes.forEach((recipe) => recipeMap.set(recipe.id, recipe));
  }
}
