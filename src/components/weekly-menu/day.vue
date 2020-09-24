<template>
  <v-card class="recipe-week-item ">
    <v-card-title>
      {{ weekday }}
    </v-card-title>

    <recipe-week-item
      :value="day.breakfast"
      class="item"
      name="Breakfast"
      @input="onBreakfastChanged"
    />

    <hr>

    <recipe-week-item
      :value="day.lunch"
      class="item"
      name="Lunch"
      @input="onLunchChanged"
    />

    <hr>

    <recipe-week-item
      :value="day.dinner"
      class="item"
      name="Dinner"
      @input="onDinnerChanged"
    />

    <hr>

    <recipe-week-item
      :value="day.snacks"
      class="item"
      name="Snacks"
      @input="onSnacksChanged"
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

  methods: {
    onSnacksChanged(input) {
      const updatedDay = JSON.parse(JSON.stringify(this.value));
      updatedDay.snacks = input;
      this.day = updatedDay;
    },
    onDinnerChanged(input) {
      const updatedDay = JSON.parse(JSON.stringify(this.value));
      updatedDay.dinner = input;
      this.day = updatedDay;
    },
    onLunchChanged(input) {
      console.log(this.value);
      const updatedDay = JSON.parse(JSON.stringify(this.value));
      updatedDay.lunch = input;
      this.day = updatedDay;
    },
    onBreakfastChanged(input) {
      const updatedDay = JSON.parse(JSON.stringify(this.value));
      updatedDay.breakfast = input;
      this.day = updatedDay;
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
