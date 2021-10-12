<template>
  <div>
    <!-- Logo -->
    <!-- <Title /> -->
    <v-row class="mt-4">
      <v-col class="text-left login-label">
        <h2>Welcome back again!</h2>
        <p class="mt-7">Hi, please enter your credentials below.</p>
      </v-col>
    </v-row>
    <v-row class="mt-n2">
      <v-col
        sm="12"
        cols="12"
        md="12"
        class="mt-2">
        <v-text-field
          :disabled="loading"
          outlined
          v-model="form.username.value"
          :class="{'text-input': form.username.isEmpty}"
          @input="validationKey(form.username,  'Username')"
          dense
          label="PRC Number"
        ></v-text-field>
        <span class="error-text">{{ form.username.msg }}</span>
      </v-col>
      <v-col
        sm="12"
        cols="12"
        md="12"
        class="mt-n8">
        <v-text-field
          :disabled="loading"
          :append-icon="visiblePassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="visiblePassword ? 'text' : 'password'"
          outlined
          v-model="form.password.value"
          :class="{'text-input': form.password.isEmpty}"
          @input="validationKey(form.password,  'Password')"
          dense
          label="Password"
          @click:append="visiblePassword = !visiblePassword"
        ></v-text-field>
        <span class="error-text">{{ form.password.msg }}</span>
      </v-col>
      <v-col
        sm="12"
        cols="12"
        md="12"
        class="mt-n8">
        <v-btn
          color="#10946d"
          class="white--text"
          block
          @click="login"
          :loading="loading">
          Sign In
        </v-btn>
        <v-alert
          class="mt-2"
          v-if="errorMessage"
          dense
          text
          type="error"
        >
          {{ errorMessage }}
        </v-alert>
      </v-col>
      <v-col
        sm="12"
        cols="12"
        md="12"
        class="text-right">
        <v-btn
          @click="showForgotPassword = true"
          small
          color="primary">
          Forgot Password
        </v-btn>
      </v-col>
    </v-row>
    <ForgotPassword
      v-if="showForgotPassword"
      @close="showForgotPassword = false"/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Title from './app-title'
import ForgotPassword from './forgot-password'
export default {
  name: 'Form',
  components: {
    Title,
    ForgotPassword
  },

  data () {
    return {
      loading: false,
      errorMessage: '',
      visiblePassword: false,
      showForgotPassword: false,
      form: {
        username: this.iRules('', true),
        password: this.iRules('', true)
      }
    }
  },

  methods: {
    ...mapMutations({
      SET_AUTH: 'common/SET_AUTH'
    }),

    async login () {
      if (!this.validateForm(this.form)) return
      this.loading = true
      try {
        const formData = this.jsonToForm(this.form)
        const response = await this.API_POST({
          url: 'Auth/validateAuth',
          data: formData
        })
        const data = response.data
        this.SET_AUTH({
          token: data.token,
          userId: data.userId,
          prcNumber: data.prcNumber,
          isDeceased: data.isDeceased,
          isInfoUpdated: !parseInt(data.isInfoUpdated) ? true : false,
          roleId: data.roleId,
          roleName: data.roleName,
          accountName: data.accountName,
          chapter: data.chapterName,
          membership: data.membershipName,
          photo: data.photo
        })
        this.goTo('dashboard')
        this.SET_ALERT_SUCCESS(response.totalPage)
      } catch (error) {
        this.errorMessage = error.response
      } finally { this.loading = false }
    }
  }
}
</script>
<style scoped>
p {
  margin: auto;
}
</style>