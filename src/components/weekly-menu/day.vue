<template>
  <v-card class="recipe-week-item ">
    <v-card-title>
      {{ weekday }}
    </v-card-title>

    <recipe-week-item
      v-model="day.breakfast"
      class="item"
      name="Breakfast"
    />

    <hr>

    <recipe-week-item
      v-model="day.lunch"
      class="item"
      name="Lunch"
    />

    <hr>


    <recipe-week-item
      v-model="day.dinner"
      class="item"
      name="Dinner"
    />

    <hr>

    <recipe-week-item
      v-model="day.snacks"
      class="item"
      name="Snacks"
    />

    <hr>
  </v-card>
</template>

<script>
import recipeWeekItem from './recipe-week-item.vue';

export default {
  components: {
    'recipe-week-item': recipeWeekItem,
  },

  props: {
    value: {
      type: Object,
      default() {
        return {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
        };
      },
    },
    weekday: {
      type: String,
      required: true,
    },
  },

  computed: {
    day: {
      get() { return this.value; },
      set(day) { this.$emit('input', day); },
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 100%;
}

.recipe-week-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
