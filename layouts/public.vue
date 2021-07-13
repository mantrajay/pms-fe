<template>
<v-app id="inspire">
  <v-main>
    <Navigation :scrolled="scrolled"/>
    <v-container
      class="content"
      fluid>
      <nuxt />
    </v-container>
    <v-btn
      v-if="scrolled > 0"
      color="#10946d"
      small
      fab
      large
      dark
      fixed
      bottom
      right
      @click="$vuetify.goTo(number, options)">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <Footer class="mt-5"/>
  </v-main>
</v-app>
</template>
<script>
import Navigation from './public-nav'
import Footer from './footer'
import * as easings from 'vuetify/lib/services/goto/easing-patterns'
export default {
  name: 'Application',
  components: {
    Navigation,
    Footer
  },

  data () {
    return {
      easing: 'easeInOutCubic',
      easings: Object.keys(easings),
      number: 0,
      duration: 300,
      offset: 0,
      window: { width: 0, height: 0 },
      scrolled: 0,
    }
  },

  computed: {
    options () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    }
  },

  created () {
    window.addEventListener("scroll", this.handleScroll)
    window.addEventListener("resize", this.handleResize)
    this.handleResize()
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleResize)
  },

  methods: {
    handleScroll() {
      // this.scrolled = window.scrollY > 0
      this.scrolled = parseInt(window.scrollY)
    },

    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
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