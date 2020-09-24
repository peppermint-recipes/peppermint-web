<template>
  <div
    @click="toggle"
  >
    <v-list-item
      :disa="active"
    >
      <v-list-item-content>
        <v-list-item-title>
          <span :style="style">
            {{ item.amount }} {{ item.unit }} {{ item.ingredient }}
          </span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span :style="style">
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
  computed: {
    style() {
      return this.active ? 'text-decoration:line-through' : '';
    },
  },
  methods: {
    toggle() {
      console.log('toggle');
      this.active = !this.active;
    },
  },
};
</script>
