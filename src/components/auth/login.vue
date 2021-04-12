<template>
  <div class="login">
    <v-container
      fill-height
    >
      <v-layout
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card>
            <v-form
              ref="form"
              v-model="valid"
            >
              <v-card-title>
                <span class="headline">
                  Peppermint:
                  <br>
                  Login
                </span>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  v-model="serverAddress"
                  label="Server"
                  :rules="[value => !!value || 'Server is required']"
                  autofocus
                  @keydown="validateAndLogin"
                />

                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="rules"
                  @keydown="validateAndLogin"
                />

                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="rules"
                  @keydown="validateAndLogin"
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn
                  color="blue darken-1"
                  text
                  @click="goToRegister"
                >
                  Go to Register
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="!valid"
                  @click="login"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { Validator } from '@/plugins/validation-rules';
import { cookieService, userService } from '@/main';

export default {
  name: 'Login',

  data() {
    return {
      valid: false,
      serverAddress: '',
      username: '',
      password: '',
      rules: [
        (value) => Validator.notEmptyString(value),
      ],
    };
  },

  methods: {
    async login() {
      const user = {
        name: this.username,
        password: this.password,
      };
      try {
        const token = await userService.loginUser(user);

        cookieService.setUserAccessToken(token.token);
        if (token) {
          this.$router.push('/recipes');
        }
      } catch (error) {
        this.$notify({
          title: 'Error',
          type: 'error',
          text: error.message,
        });
      }
    },

    validateAndLogin(event) {
      if (event.code === 'Enter') {
        if (this.$refs.form.validate()) {
          this.login();
        }
      }
    },

    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>
