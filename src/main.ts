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
import LocalStorageService from './services/cookieService';

export const cookieService = new LocalStorageService();

const axiosApiClient = new AxiosHttpClient({
  cookieService,
});

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

const recipeLocalStore = new LocalStore<Recipe>('recipes.txt');
const recipeWebStore = new WebStore<Recipe>('/recipes/', axiosApiClient.http);
export const recipeService = new StoreHandler<Recipe>({
  localStore: recipeLocalStore,
  webStore: recipeWebStore,
});

const weekLocalStore = new LocalStore<Week>('week.txt');
const weekWebStore = new WebStore<Week>('/weekplans/', axiosApiClient.http);
export const weekService = new StoreHandler<Week>({
  localStore: weekLocalStore,
  webStore: weekWebStore,
});

const shoppingListLocalStore = new LocalStore<ShoppingList>('shoppingList.txt');
const shoppingListWebStore = new WebStore<ShoppingList>('/shopping-lists/', axiosApiClient.http);
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
