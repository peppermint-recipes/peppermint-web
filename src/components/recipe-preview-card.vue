<template>
  <div>
    <v-card
      shaped
      max-width="250"
      min-height="280"
      :to="{ name:'recipe', params: { id: recipe.id }}"
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
          class="calories-chip"
          small
          color="primary"
        >
          {{ recipe.calories }} cal
        </v-chip>
        <v-chip
          v-if="recipe.totalTime"
          class="total-time-chip mx-2"
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
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
