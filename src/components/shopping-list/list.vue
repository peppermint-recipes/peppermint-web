<template>
  <div>
    <v-toolbar dark>
      <v-spacer />
      <v-btn
        color="primary"
        @click="clearShoppingList"
      >
        Clear List
      </v-btn>
    </v-toolbar>

    <v-list>
      <list-item
        v-for="(item, index) in shoppingList"
        :key="index"
        :item="item"
      />
    </v-list>
  </div>
</template>

<script>
import parseIngredients from '../../services/ingredientParser';
import * as shoppingListService from '../../services/shoppingListService';

import listItem from './list-item.vue';

export default {
  components: {
    'list-item': listItem,
  },

  data() {
    return {
      shoppingList: [],
      recipeList: [],
    };
  },

  async created() {
    this.recipeList = await shoppingListService.getItems();
    const filtered = [];
    this.recipeList.forEach(
      (recipe) => {
        const ingredients = parseIngredients(recipe.ingredients);
        ingredients.forEach((ingredient) => {
          const foundIndex = filtered.findIndex(
            (element) => element.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase(),
          );
          if (foundIndex > 0) {
            const old = filtered[foundIndex];
            const oldAmount = Number.parseInt(old.amount, 10);
            const newAmount = oldAmount + Number.parseInt(ingredient.amount, 10);
            filtered[foundIndex] = {
              ...old,
              amount: newAmount,
              recipe: old.recipe.concat(`  ${recipe.name}`),
            };
          } else {
            filtered.push({
              recipe: recipe.name,
              ...ingredient,
            });
          }
        });
      },
    );
    this.shoppingList = filtered;
  },

  methods: {
    async clearShoppingList() {
      await shoppingListService.removeAllItems();
      this.recipeList = await shoppingListService.getItems();
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
