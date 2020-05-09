<template>
  <div class="view">
    <v-container>
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              Recipes
            </v-col>

            <v-col>
              <div style="float: right">
                <span>Week: </span>
                <v-btn @click="clearWeek">
                  Clear
                </v-btn>

                <v-btn @click="saveWeek">
                  Save
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-title>

        <v-container>
          <v-row>
            <v-col
              v-for="recipe in recipes"
              :key="recipe.id"
              sm="6"
              md="3"
              xl="2"
            >
              <draggable
                :list="[recipe]"
                :sort="false"
                :group=" {name: 'recipes', pull: 'clone', put: false }"
                @start="drag=true"
                @end="drag=false"
              >
                <v-card>
                  {{ recipe.name }}
                </v-card>
              </draggable>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>

    <v-container style="flex: auto">
      <v-row class="week-container">
        <v-col class="day-container">
          <day
            v-model="week.monday"
            class="day"
            weekday="Mon"
          />
        </v-col>

        <v-col class="day-container">
          <day
            v-model="week.tuesday"
            class="day"
            weekday="Tue"
          />
        </v-col>

        <v-col class="day-container">
          <day
            v-model="week.wednesday"
            class="day"
            weekday="Wed"
          />
        </v-col>

        <v-col class="day-container">
          <day
            v-model="week.thursday"
            class="day"
            weekday="Thu"
          />
        </v-col>

        <v-col class="day-container">
          <day
            v-model="week.friday"
            class="day"
            weekday="Fri"
          />
        </v-col>

        <v-col class="day-container">
          <day
            v-model="week.saturday"
            class="day"
            weekday="Sat"
          />
        </v-col>

        <v-col class="day-container">
          <day
            v-model="week.sunday"
            class="day"
            weekday="Sun"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import day from './day.vue';
import { getAllRecipes } from '../../services/recipeService';
import { updateWeek, getWeek } from '../../services/weekService';

export default {
  components: {
    draggable,
    day,
  },

  data() {
    return {
      recipes: [],
      drag: false,
      week: {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {},
      },
    };
  },

  async created() {
    this.recipes = await getAllRecipes();
    const weekFromServer = await getWeek();

    this.week = {
      monday: weekFromServer.monday || {},
      tuesday: weekFromServer.tuesday || {},
      wednesday: weekFromServer.wednesday || {},
      thursday: weekFromServer.thursday || {},
      friday: weekFromServer.friday || {},
      saturday: weekFromServer.saturday || {},
      sunday: weekFromServer.sunday || {},
    };
  },

  methods: {
    clearWeek() {
      this.week = {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {},
      };
      updateWeek(this.week);
    },
    saveWeek() {
      updateWeek(this.week);
    },
  },
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.week-container {
  height: 100%;
}

.day-container {
  display: flex;
}

.day {
  margin: -0.5em 0;
  padding: 0.5em;
  width: 100%;
}
</style>
