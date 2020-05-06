<template>
  <div class="recipe-week-item">
    {{ name }}

    <draggable
      v-model="draggableRecipes"
      class="draggable-area"
      :group="{name: 'recipes', pull: true, put: true }"
      @start="drag=true"
      @end="drag=false"
      @change="handleDraggableChange"
    >
      <v-card
        v-for="recipe in recipes"
        :key="recipe.id"
      >
        {{ recipe.name }}
        <v-btn
          x-small
          color="primary"
          style="float: right"
          @click="removeRecipe(recipe)"
        >
          x
        </v-btn>
      </v-card>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      drag: false,
      draggableRecipes: [],
      recipes: [],
    };
  },

  watch: {
    value: {
      immediate: true,
      handler() {
        this.recipes = JSON.parse(JSON.stringify(this.value));
        this.draggableRecipes = JSON.parse(JSON.stringify(this.value));
      },
    },
  },

  methods: {
    handleDraggableChange(event) {
      if (event.added) {
        const newRecipe = event.added.element;
        if (this.recipes.find((recipe) => recipe.id === newRecipe.id)) {
          this.draggableRecipes.splice(event.added.newIndex, 1);
        }
      }

      this.recipes = this.draggableRecipes;
      this.$emit('input', this.recipes);
    },

    removeRecipe(recipeToRemove) {
      this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeToRemove.id);

      this.draggableRecipes = this.recipes;
      this.$emit('input', this.recipes);
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe-week-item {
  display: flex;
  flex-direction: column;
}

.draggable-area {
  flex: 1;
  width: 100%;
}

</style>
