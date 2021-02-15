<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="recipe in recipes"
          :key="recipe.id"
          sm="6"
          md="3"
          xl="2"
        >
          <recipe-preview-card
            class="recipe-preview-card pa-3"
            :recipe="recipe"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { recipeService } from '@peppermint/peppermint-logic';
import recipePreviewCard from './recipe-preview-card.vue';

export default {
  components: {
    'recipe-preview-card': recipePreviewCard,
  },

  data() {
    return {
      showDialog: false,
      recipes: [],
    };
  },

  async created() {
    this.recipes = await recipeService.getAllRecipes();
  },
};
</script>
