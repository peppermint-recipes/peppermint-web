import LocalStore from '@/Stores/LocalStore';
import WebStore from '@/Stores/WebStore';
import { ShoppingList } from '@/types/ShoppingList';
import { Capacitor } from '@capacitor/core';

const plattformIsNative = Capacitor?.isNative;

type Id = string
type ShoppingListMap = Map<Id, ShoppingList>

type Differences = {
  new: ShoppingList[],
  updated: ShoppingList[],
}
export default class ShoppingListService {
  private shoppingListLocalStore: LocalStore<ShoppingListMap>;

  private shoppingListWebStore: WebStore<ShoppingList, ShoppingListMap>;

  private shoppingLists: ShoppingListMap;

  constructor(options: {
    shoppingListLocalStore: LocalStore<ShoppingListMap>,
    shoppingListWebStore: WebStore<ShoppingList, ShoppingListMap>,
  }) {
    this.shoppingListLocalStore = options.shoppingListLocalStore;
    this.shoppingListWebStore = options.shoppingListWebStore;
    this.shoppingLists = new Map();
    this.sync();
  }

  public getShoppingLists() {
    const activeShoppingLists: ShoppingList[] = [];
    this.shoppingLists.forEach((shoppingList) => {
      if (!shoppingList.isDeleted) {
        activeShoppingLists.push(shoppingList);
      }
    });

    return activeShoppingLists;
  }

  public getShoppingListById(id: string): ShoppingList | undefined {
    return this.shoppingLists.get(id);
  }

  async addShoppingList(shoppingList: ShoppingList) {
    let shoppingListFromServer;
    try {
      shoppingListFromServer = await this.shoppingListWebStore.saveOne(shoppingList);
    } catch (error) {
      console.log(error);
    }

    if (plattformIsNative) {
      if (shoppingListFromServer) {
        this.shoppingLists.set(shoppingListFromServer.id, shoppingListFromServer);
      } else {
        this.shoppingLists.set(shoppingList.id, shoppingList);
      }
    }

    await this.shoppingListLocalStore.persist(this.shoppingLists);
  }

  async removeShoppingList(id: string) {
    let shoppingListToDelete = this.shoppingLists.get(id);

    if (!shoppingListToDelete) {
      return;
    }

    shoppingListToDelete.isDeleted = true;

    try {
      shoppingListToDelete = await this.shoppingListWebStore.delete(id);
    } catch (error) {
      console.log(error);
    }

    this.shoppingLists.set(shoppingListToDelete.id, shoppingListToDelete);

    if (plattformIsNative) {
      this.shoppingListLocalStore.persist(this.shoppingLists);
    }
  }

  private async sync() {
    const webRecipes = await this.shoppingListWebStore.get();
    const localRecipes = await this.shoppingListLocalStore.read();

    const {
      serverDifference,
      localDifference,
    } = this.getDifferences(webRecipes, localRecipes);

    const createdRecipes = await Promise.all(
      serverDifference.new.map((recipe) => this.shoppingListWebStore.saveOne(recipe)),
    );
    const updatedRecipes = await Promise.all(
      serverDifference.updated.map(
        (recipe) => this.shoppingListWebStore.updateOne(recipe.id, recipe),
      ),
    );

    const syncedRecipes: ShoppingListMap = new Map();

    this.addshoppingListsToShoppingListMap(createdRecipes, syncedRecipes);
    this.addshoppingListsToShoppingListMap(updatedRecipes, syncedRecipes);
    this.addshoppingListsToShoppingListMap(localDifference.new, syncedRecipes);
    this.addshoppingListsToShoppingListMap(localDifference.updated, syncedRecipes);

    this.shoppingLists = syncedRecipes;

    this.shoppingListLocalStore.persist(this.shoppingLists);
  }

  private addshoppingListsToShoppingListMap(recipes: ShoppingList[], recipeMap: ShoppingListMap) {
    recipes.forEach((recipe) => recipeMap.set(recipe.id, recipe));
  }

  getDifferences(serverShoppingLists: ShoppingListMap, localShoppingLists: ShoppingListMap) {
    const localShoppingListsCopy = new Map(localShoppingLists);

    const serverDifference: Differences = {
      new: [],
      updated: [],
    };

    const localDifference: Differences = {
      new: [],
      updated: [],
    };

    serverShoppingLists.forEach((serverShoppingList) => {
      const localRecipe = localShoppingListsCopy.get(serverShoppingList.id);

      if (!localRecipe) {
        localDifference.new.push(serverShoppingList);
        return;
      }

      // check correct time checks
      if (localRecipe) {
        if (serverShoppingList.lastUpdated > localRecipe.lastUpdated) {
          localDifference.updated.push(serverShoppingList);
        } else if (serverShoppingList.lastUpdated < localRecipe.lastUpdated) {
          serverDifference.updated.push(localRecipe);
        }
        localShoppingListsCopy.delete(localRecipe.id);
      }
    });

    const array = Array.from(localShoppingListsCopy.values());
    serverDifference.new.push(...array);

    return {
      serverDifference,
      localDifference,
    };
  }
}
