<template>
  <div>
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>
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
            id="close-recipe-button"
            color="primary"
            @click="close"
          >
            Close
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
    </v-dialog>
  </div>
</template>

<script>
import { createRecipe } from '../services/recipeService';

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      recipe: {
        name: '',
        yield: '',
        activeTime: '',
        totalTime: '',
        ingredients: '',
        instructions: '',
      },
    };
  },

  computed: {
    showDialog: {
      get() { return this.value; },
      set(showDialog) { this.$emit('input', showDialog); },
    },
  },

  methods: {
    saveRecipe() {
      createRecipe(this.recipe);
      this.close();
    },
    close() {
      this.showDialog = false;
      setTimeout(() => {
        this.recipe = {
          name: '',
          yield: '',
          activeTime: '',
          totalTime: '',
          ingredients: '',
          instructions: '',
        };
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
