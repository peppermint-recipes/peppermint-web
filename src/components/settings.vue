<template>
  <div>
    <v-card class="d-flex flex-column align-stretch">
      <v-card-title>
        <v-btn
          id="go-back-to-recipes-button"
          color="primary"
          class="mr-2"
          @click="goToRecipes"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
          Back
        </v-btn>
        <span class="headline">
          Settings
        </span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                id="settings-server-address-field"
                v-model="settings.serverName"
                autofocus
                outlined
                label="ServerName"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                id="settings-user-id-field"
                v-model="settings.userId"
                outlined
                label="UserId"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          id="save-settings-button"
          color="primary"
          @click="saveSettings"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { settingsService } from '../main';

export default {
  props: {
    id: {
      type: [String, Number],
      default: '',
      required: false,
    },
  },

  data() {
    return {
      settings: Object,
    };
  },

  // Use watcher for setting this.recipe to handle switching from an editing
  // an existing recipe to creating a new one
  watch: {
    id: {
      async handler(value) {
        if (!value) {
          this.settings = {
            serverAddress: '',
            userId: 0,
          };
        } else {
          this.settings = await settingsService.getSettings();
        }
      },
      immediate: true,
    },
  },

  methods: {
    saveSettings() {
      settingsService.updateSettings(this.settings);
    },
    goToRecipes() {
      this.$router.push({ name: 'recipes' });
    },
  },
};
</script>
