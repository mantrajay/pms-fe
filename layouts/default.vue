<template>
  <v-app id="inspire">
    <client-only>
      <Navigation v-if="GET_AUTH.token"/>
      <v-main>
        <nuxt />
      </v-main>
      <Alert />
      <Loading />
   </client-only>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
import Navigation from './navigation'
export default {
  name: 'Application',
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({
      GET_AUTH: 'common/GET_AUTH'
    })
  }
}
</script>
<style>
/* Text Input Validation */
.text-input .v-input__slot fieldset {
  border: 1.5px solid red !important;
}
.text-input .v-text-field__slot label {
  color: red !important;
  font-size: 13px;
}
.v-text-field__slot label {
  font-size: 14px !important;
}
.v-select__slot label {
  font-size: 14px !important;
}
.text-input .v-select__slot label {
  color: red !important;
}
.error-text {
  position: relative;
  top: -30px;
  font-size: 12px;
  color: red;
}
main {
  background-color: #f5f5f5;
}
.container {
  color: #595959;
}
</style>