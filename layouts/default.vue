<template>
  <v-app id="inspire">
    <client-only>
      <v-main>
        <Navigation v-if="GET_AUTH.token"/>
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
  background-color: rgb(179 178 177 / 39%);
}
.container {
  color: #595959;
}
table tr td {
  font-size: 12px !important;
}
.v-list-item__title span {
  font-size: 12px !important;
}
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(179, 178, 178);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(157, 156, 156);
}
.dotted {
  border-top: 2px #7777 dotted !important;
}
</style>