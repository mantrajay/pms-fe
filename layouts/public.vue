<template>
<v-app id="inspire">
  <v-main>
    <Navigation />
    <v-container fluid>
      <nuxt />
    </v-container>
  </v-main>
</v-app>
</template>
<script>
import Navigation from './public-nav'
export default {
  name: 'Application',
  components: {
    Navigation
  }
}
</script>
<style>
body {
  overflow-x: hidden;
}
</style>