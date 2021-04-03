import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import LocalStore from './Stores/LocalStore';
import WebStore from './Stores/WebStore';
import { Recipe } from './types/Recipe';
import AxiosHttpClient from './plugins/axios';
import { Week } from './types/Week';
import { ShoppingList } from './types/ShoppingList';
import StoreHandler from './Stores/StoreHandler';
import UserService from './services/userService';
import { CookieService } from './services/cookieService';

export const cookieService = new CookieService();

const axiosApiClient = new AxiosHttpClient({
  cookieService,
});

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

type Id = string;
type RecipeMap = Map<Id, Recipe>
const recipeLocalStore = new LocalStore<RecipeMap>('recipes.txt');
const recipeWebStore = new WebStore<Recipe, Recipe[]>('/recipes/', axiosApiClient.http);
export const recipeService = new StoreHandler<Recipe>({
  localStore: recipeLocalStore,
  webStore: recipeWebStore,
});

type WeekMap = Map<Id, Week>
const weekLocalStore = new LocalStore<WeekMap>('week.txt');
const weekWebStore = new WebStore<Week, Week[]>('/weekplans/', axiosApiClient.http);
export const weekService = new StoreHandler<Week>({
  localStore: weekLocalStore,
  webStore: weekWebStore,
});

type ShoppingListMap = Map<Id, ShoppingList>
const shoppingListLocalStore = new LocalStore<ShoppingListMap>('shoppingList.txt');
const shoppingListWebStore = new WebStore<ShoppingList, ShoppingList[]>('/shopping-lists/', axiosApiClient.http);
export const shoppingListService = new StoreHandler<ShoppingList>({
  localStore: shoppingListLocalStore,
  webStore: shoppingListWebStore,
});

export const userService = new UserService({ apiClient: axiosApiClient.http, accessToken: '' });

// export const settingsService = new settingsService({

// })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
