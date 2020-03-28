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
          <v-hover
            v-slot:default="{ hover }"
          >
            <recipe-preview-card
              class="pa-3"
              :hovered="hover"
              :recipe="recipe"
            />
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import recipePreviewCard from './recipe-preview-card.vue';
import { getAllRecipes } from '../services/recipeService';

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
    this.recipes = await getAllRecipes();
  },
};
</script>
