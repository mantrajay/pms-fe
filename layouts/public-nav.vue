<template>
  <v-card
    color="white"
    class="card-nav text-center"
    :elevation="0">
    <v-card-title class="border-nav">
      <v-row>
        <v-col
          cols="12"
          md="7"
          sm="7"
          class="text-left">
          <Drawer v-if="!$vuetify.breakpoint.lg"/>
          <v-btn
            v-else
            small
            color="#10946d"
            text
            v-for="(nav, index) in navigation"
            :key="index"
            @click="goTo(nav.to)"
            :class="{'active': $route.name == nav.name}">
            {{ nav.label }}
          </v-btn>
          <v-btn
            v-if="$vuetify.breakpoint.lg"
            absolute
            right
            elevation="0"
            class="white--text"
            color="#10946d"
            @click="goTo('/login')">
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-img
      height="260px"
      :aspect-ratio="1"
      :src="require('~/assets/page-logo.jpg')">
      <p class="align-title white--text">
        {{ titlePage.toUpperCase() }}
      </p>
     </v-img>
  </v-card>
</template>
<script>
import Drawer from './drawer'
export default {
  name: 'Sub-Navigation',
  components: {
    Drawer
  },
  data () {
    return {
      navigation: [
        {
          label: 'Home',
          name: 'index' ,
          title: 'Anniversaries & Induction Ceremonies',
          to: '/'
        },
        { 
          label: 'Activities',
          name: 'public-activities' ,
          title: 'List of Activities',
          to: '/public/activities'
        },
        {
          label: 'Contact Us',
          name: 'public-contact-us' ,
          title: 'Contact Us',
          to: '/public/contact-us'
        },
        {
          label: 'Officers',
          name: 'public-officers',
          title: 'Component Officers',
          to: '/public/officers'
        },
        {
          label: 'Hymn',
          name: 'public-hymn',
          title: 'PANGASINAN MEDICAL SOCIETY HYMN',
          to: '/public/hymn'
        },
        {
          label: 'Presidents',
          name: 'public-past-presidents',
          title: 'All Presidents',
          to: '/public/past-presidents'
        }
			]
    }
  },

  computed: {
    titlePage () {
      let title = ''
      this.navigation.map((items, key) => {
        if (items.name === this.$route.name) title = items.title
      })
      return title
    }
  }
}
</script>
<style scoped>
.active {
  background-color: #189772;
  border-bottom: 3px solid #ffb463;
  color: #ffffff !important;
  font-weight: bold;
}
.tel-no {
  font-size: 12px;
  font-weight: bold;
}
.border-nav {
  border-bottom: 5px solid #ffb463;
}
.align-title {
  margin-top: 100px !important;
  font-size: 29px;
  font-weight: bold;
}
</style>