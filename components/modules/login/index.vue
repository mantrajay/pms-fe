<template>
<v-row>
  <v-col
    cols="12"
    md="4"
    sm="4">
  </v-col>
  <v-col
    cols="12"
    md="4"
    sm="4"
    class="mt-5">
    <!-- <v-btn
      @click="goTo('/')"
      text
      color="primary">
      <v-icon>mdi-chevron-double-left</v-icon>
      Go to PMS website
    </v-btn> -->
    <v-card
      class="pl-8 pr-8 pb-8"
      outlined>
      <Form />
    </v-card>
    <!-- <div class="copy-right">
      <p>
        &copy; Copyright {{ currentYear }}
        <span class="copy-text">
          <b>Pangasinan Medical Society</b>
        </span>
      </p>
      <p>
        Developed by:
        <span class="copy-text">
          <b>Mantra Jay</b>
        </span>
      </p>
    </div> -->
  </v-col>
  <v-col
    cols="12"
    md="4"
    sm="4">
  </v-col>
  <!-- <v-col
    cols="12"
    md="9"
    sm="9">
    <v-card outlined>
      <v-img
        :aspect-ratio="1.2"
        :src="loginLogo" />
    </v-card>
  </v-col> -->
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
      loginLogo: require('@/assets/images/logo.jpg'),
    }
  },

  computed: {
    currentYear () {
      let date = new Date()
      return date.getFullYear()
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
  /* opacity: .6;
  height: 100vh; */
}
.card-login {
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.copy-right {
  font-size: 11px;
  position: absolute;
  bottom: 50px;
  left: 20px;
  z-index: 3;
  background-color: #ffffffbd;
  padding: 5px 13px;
  border-radius: 6px;
}
.copy-text {
  color: #1976d2;
}
p {
  margin: auto;
}
</style>
