<template>
  <div>
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
import { getItems } from '../../services/shoppingListService';
import ingredientsParser from '../../services/ingredientParser';
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
    this.recipeList = await getItems();
    console.log(this.recipeList);
    const filtered = [];
    this.recipeList.forEach(
      (recipe) => {
        const ingredients = ingredientsParser(recipe.ingredients);
        ingredients.forEach((ingredient) => {
          console.log(filtered);
          console.log(ingredient);
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
    console.log(filtered);
  },

};
</script>

<style lang="scss" scoped>

</style>
