<template>
<v-row class="login-container">
  <v-col
    cols="12"
    md="12"
    sm="12">
    <div class="logo-wrapper">
      <img
        class="background-logo"
        :src="loginLogo" />
    </div>
    <v-card
      width="400px"
      class="card-login">
      <Form />
    </v-card>
  </v-col>
  <!-- :style="{'background-image': `url(${loginLogo})`,
    'background-size': 'cover',
    'min-height': '100vh' }" -->
</v-row>
</template>
<script>
/* eslint-disable */
import Form from './child/form'
export default {
  name: 'Login',
  components: {
    Form
  },
  data () {
    return {
      loginLogo: require('@/assets/images/logo.jpg')
    }
  }
}
</script>
<style scoped>
.logo-wrapper {
  background-color: #777;
}
.background-logo {
  width: 100%;
  opacity: .6;
  height: 100vh;
}
.card-login {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
