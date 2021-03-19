import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import RecipeService from './services/recipeService';
import WeekService from './services/weekService';
import ShoppingListService from './services/shoppingListService';

export const recipeService = new RecipeService();
export const weekService = new WeekService();
export const shoppingListService = new ShoppingListService();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
