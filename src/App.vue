<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          link
          to="/recipe"
        >
          <v-list-item-action>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>New Recipe</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/recipes"
        >
          <v-list-item-action>
            <v-icon>mdi-pot-mix</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Recipes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/week"
        >
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/shopping-list"
        >
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Shopping List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: true,
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
