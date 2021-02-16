<template>
<v-row class="login-container">
  <v-col
    cols="12"
    md="3"
    sm="3"
    class="mt-5">
    <Form />
  </v-col>
  <v-col
    class="d-none d-md-flex d-sm-none"
    cols="12"
    md="9"
    sm="9"
    :style="{'background-image': `url(${loginLogo})`,
    'background-size': 'cover',
    'min-height': '100vh' }">
  </v-col>
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
      loginLogo: require('@/assets/images/login-background.jpg')
    }
  }
}
</script>
