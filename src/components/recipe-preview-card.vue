<template>
  <div>
    <v-card
      shaped
      :outlined="hovered"
      max-width="250"
      min-height="280"
      :class="{ 'on-hover': hovered }"
    >
      <v-img
        src="../assets/peppermint.jpg"
      />
      <v-card-title>
        {{ recipe.name }}
      </v-card-title>
      <v-card-subtitle>
        <v-chip
          v-if="recipe.calories"
          small
          color="primary"
        >
          {{ recipe.calories }} cal
        </v-chip>
        <v-chip
          v-if="recipe.totalTime"
          class="mx-2"
          color="primary"
          small
        >
          {{ recipe.totalTime }} min
        </v-chip>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    hovered: {
      type: Boolean,
      default: false,
    },
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
