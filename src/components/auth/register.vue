<template>
  <div class="register">
    <v-container
      fill-height
      fluid
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
                  Register
                </span>
              </v-card-title>

              <v-card-text>
                <v-text-field
                  v-model="serverAddress"
                  label="Server"
                  :rules="[value => !!value || 'Server is required']"
                  autofocus
                  @keydown="validateAndRegister"
                />

                <v-text-field
                  v-model="username"
                  label="Username"
                  :rules="[value => !!value || 'Username is required']"
                  @keydown="validateAndRegister"
                />

                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="[value => !!value || 'Password is required']"
                  @keydown="validateAndRegister"
                />

                <v-text-field
                  v-model="repeatedPassword"
                  label="Repeat Password"
                  type="password"
                  :rules="rules"
                  @keydown="validateAndRegister"
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer />

                <v-btn
                  color="blue darken-1"
                  text
                  @click="goTologin"
                >
                  Back to Login
                </v-btn>

                <v-btn
                  :disabled="!valid"
                  color="blue darken-1"
                  text
                  @click="registerUser"
                >
                  register
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
// import { postUser, loginUser } from '@/utils/api-connector';
import { userService, cookieService } from '@/main';

export default {
  name: 'Register',

  data() {
    return {
      valid: false,
      serverAddress: '',
      username: '',
      password: '',
      repeatedPassword: '',
      rules: [
        (value) => Validator.notEmpty(value),
        (value) => Validator.samePassword(this.password, value),
      ],
    };
  },

  methods: {
    async registerUser() {
      try {
        if (this.password !== this.repeatedPassword) {
          return;
        }
        const newUser = {
          name: this.username,
          password: this.password,
          isAdmin: false,
          isSystemUser: false,
          isDisabled: false,
        };
        const token = await userService.loginUser(newUser);

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

    validateAndRegister(event) {
      if (event.code === 'Enter') {
        if (this.$refs.form.validate()) {
          this.registerUser();
        }
      }
    },

    goTologin() {
      this.$router.push('/');
    },
  },
};
</script>
