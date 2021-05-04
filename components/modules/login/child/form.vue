<template>
<div class="wrapper">
  <!-- Logo -->
  <!-- <Title /> -->
  <v-row class="mt-4">
    <v-col class="text-left login-label">
      <h5>Hi, please enter your</h5>
      <h5>credentials below. </h5>
    </v-col>
  </v-row>
  <v-row class="mt-n2">
    <v-col
      sm="12"
      cols="12"
      md="12">
      <v-text-field
        :disabled="loading"
        outlined
        v-model="form.username.value"
        :class="{'text-input': form.username.isEmpty}"
        @input="validationKey(form.username,  'Username')"
        dense
        label="Enter username"
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
        label="Enter password"
        @click:append="visiblePassword = !visiblePassword"
      ></v-text-field>
      <span class="error-text">{{ form.password.msg }}</span>
    </v-col>
    <v-col
      sm="12"
      cols="12"
      md="12"
      class="mt-n8">
      <v-btn color="primary"
        block
        @click="login"
        :loading="loading">
        Sign In
      </v-btn>
    </v-col>
  </v-row>
  <v-row class="footer">
    <v-col
      cols="12"
      md="12"
      sm="12"
      class="text-center">
      <p class="copy-right">
        &copy; Copyright 2021
        <span class="copy-text">
          <b>Pangasinan Medical Society</b>
        </span>
      </p>
    </v-col>
  </v-row>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import Title from './app-title'
export default {
  name: 'Form',
  components: {
    Title
  },

  computed: {
    isSubmitBtn () {
      let disabled = false
      Object.keys(this.form).forEach(index => {
        let item = this.form[index]
        if (item.required && !item.value) {
          disabled = true
        }
      })
      return disabled
    }
  },

  data () {
    return {
      loading: false,
      visiblePassword: false,
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
      if (!this.validateForm(this.form))  return
      this.loading = true
      try {
        let formData = this.jsonToForm(this.form)
        let response = await this.API_POST({
          url: 'Auth/validateAuth',
          data: formData
        })
        let data = response.data
        this.SET_AUTH({
          token: data.token,
          userId: data.userId,
          isInfoUpdated: !parseInt(data.isInfoUpdated) ? true : false,
          roleId: data.roleId,
          roleName: data.roleName,
          accountName: data.accountName,
          chapter: data.chapterName,
          membership: data.membershipName,
          photo: data.photo
        })
        let route = data.roleId == 1 ? 'members' : 'activities'
        this.goTo(route)
        this.SET_ALERT_SUCCESS(response.totalPage)
      } catch (error) {
        this.SET_ALERT_ERROR(error.response)
      } finally { this.loading = false }
    }
  }
}
</script>
<style scoped>
.wrapper {
  width: 80%;
  margin: auto;
  height: 45vh;
}
.footer {
  position: absolute;
  bottom: 0;
}
.copy-right {
  font-size: 10px;
}
.copy-text {
  color: #1976d2;
}
h5 {
  color: #595959;
}
</style>