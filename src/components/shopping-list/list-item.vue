<template>
  <div
    @click="toggle"
  >
    <v-list-item
      :disa="active"
    >
      <v-list-item-content>
        <v-list-item-title>
          <span style="text-decoration:line-through">
            {{ item.amount }} {{ item.unit }} {{ item.ingredient }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span style="text-decoration:line-through">
            {{ item.recipe }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggle() {
      console.log('toggle');
      this.active = !this.active;
    },
  },
};
</script>
