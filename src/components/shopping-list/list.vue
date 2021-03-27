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
import { shoppingListService } from '@/main';
import parseIngredients from '../../services/ingredientParser';

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

  created() {
    const allLists = shoppingListService.getAll();
    // eslint-disable-next-line prefer-destructuring
    this.recipeList = allLists[0];
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
      const {
        id, userId, isDeleted, lastUpdated,
      } = this.recipeList;
      const clearedList = {
        id, userId, isDeleted, lastUpdated, items: [],
      };

      await shoppingListService.update(this.recipeList.id, clearedList);
      const allLists = shoppingListService.getAll();
      // eslint-disable-next-line prefer-destructuring
      this.recipeList = allLists[0];
    },
  },

};
</script>

<style lang="scss" scoped>

</style>
