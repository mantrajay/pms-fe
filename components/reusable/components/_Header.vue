<template>
<v-row :class="{'nav-small': $vuetify.breakpoint.lg}">
  <v-col
    cols="12"
    md="6"
    sm="6"
    class="mb-2">
    <h2>{{ title }}</h2>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
h2 {
  font-size: 18pt;
  color: #595959;
}
.nav-small {
  margin-top: -80px;
}
</style>