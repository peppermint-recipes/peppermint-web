<template>
  <div>
    <v-list>
      <v-list-item
        v-for="item in shoppingList"
        :key="item.name"
      >
        {{ item.name }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { getItems } from '../../services/shoppingListService';

export default {
  data() {
    return {
      shoppingList: [],
    };
  },

  async created() {
    this.shoppingList = await getItems();
  },

};
</script>

<style lang="scss" scoped>

</style>
