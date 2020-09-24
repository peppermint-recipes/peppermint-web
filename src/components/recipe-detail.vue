<template>
  <div>
    <v-card class="d-flex flex-column align-stretch">
      <v-card-title>
        <v-btn
          id="go-back-to-recipes-button"
          color="primary"
          class="mr-2"
          @click="goToRecipes"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
          Back
        </v-btn>
        <span class="headline">
          Add Recipe
        </span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                id="recipe-name-field"
                v-model="recipe.name"
                autofocus
                outlined
                label="Name"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                id="recipe-yield-field"
                v-model="recipe.yield"
                outlined
                label="Yield"
              />
            </v-col>
            <v-col>
              <v-text-field
                id="recipe-active-time-field"
                v-model="recipe.activeTime"
                outlined
                label="Time active"
              />
            </v-col>
            <v-col>
              <v-text-field
                id="recipe-total-time-field"
                v-model="recipe.totalTime"
                outlined
                label="Time total"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                id="recipe-ingredients-field"
                v-model="recipe.ingredients"
                auto-grow
                outlined
                label="Ingredients"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                id="recipe-instructions-field"
                v-model="recipe.instructions"
                auto-grow
                outlined
                label="Instructions"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="id !== 'new'"
          id="delete-recipe-button"
          color="primary"
          @click="addToShoppingList"
        >
          Add To Shopping List
        </v-btn>
        <v-btn
          v-if="id !== 'new'"
          id="delete-recipe-button"
          color="primary"
          @click="deleteCurrentRecipe"
        >
          Delete
        </v-btn>
        <v-btn
          id="save-recipe-button"
          color="primary"
          @click="saveRecipe"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { createRecipe, getRecipeById, deleteRecipe } from '../services/recipeService';
import { addItem } from '../services/shoppingListService';

export default {
  props: {
    id: {
      type: [String, Number],
      default: '',
      required: false,
    },
  },

  data() {
    return {
      recipe: Object,
    };
  },

  // Use watcher for setting this.recipe to handle switching from an editing
  // an existing recipe to creating a new one
  watch: {
    id: {
      async handler(value) {
        if (!value) {
          this.recipe = {
            name: '',
            yield: '',
            activeTime: '',
            totalTime: '',
            ingredients: '',
            instructions: '',
          };
        } else {
          this.recipe = await getRecipeById(value);
        }
      },
      immediate: true,
    },
  },

  methods: {
    saveRecipe() {
      createRecipe(this.recipe);
    },
    deleteCurrentRecipe() {
      deleteRecipe(this.id);
      this.goToRecipes();
    },
    goToRecipes() {
      this.$router.push({ name: 'recipes' });
    },
    addToShoppingList() {
      addItem(this.recipe);
    },
  },
};
</script>
