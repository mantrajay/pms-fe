<template>
<v-app id="inspire">
  <v-main>
    <!-- <Navigation /> -->
    <SubNav />
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
import SubNav from './sub-nav'
import Footer from './footer'
export default {
  name: 'Application',
  components: {
    Navigation,
    SubNav,
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