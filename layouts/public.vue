<template>
<v-app id="inspire">
  <v-main>
    <!-- <Navigation /> -->
    <Navigation />
    <v-container
      class="content"
      fluid>
      <nuxt />
    </v-container>
    <Footer class="mt-5"/>
  </v-main>
</v-app>
</template>
<script>
import Navigation from './public-nav'
import Footer from './footer'
export default {
  name: 'Application',
  components: {
    Navigation,
    Footer
  }
}
</script>
<style>
body {
  overflow-x: hidden;
}
.card-nav {
  border-radius: 0 !important;
  height: 100px;
}
.content {
  margin-top: 100px;
}
</style>