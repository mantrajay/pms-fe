<template>
<div>
  <div class="d-flex">
    <v-app-bar-nav-icon
      class="nav-icon ml-n4 mt-3"
      color="#10946d"
      @click="drawer = !drawer"/>
    <v-img
      class="ml-1"
      max-width="120"
      max-height="100"
      :src="require('~/assets/nav-logo.png')"/>
    <h2 class="ml-2 mt-4 header">PMS</h2>
    <v-spacer></v-spacer>
    <v-btn
      absolute
      right
      class="login-mobile"
      elevation="0"
      color="#10946d"
      @click="goTo('/login')">
      Login
    </v-btn>
  </div>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    :class="{'navigation': $vuetify.breakpoint.lg}">
    <v-list dense>
      <v-subheader>Navigation</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="#10946d">
        <v-list-item
          v-for="(item, i) in navigation"
          :key="i"
          @click="goTo(item.to)">
          <v-list-item-content>
            <v-list-item-title v-text="item.label"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon v-if="$route.name === item.name">
            <v-icon>mdi-check-circle-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</div>
</template>
<script>
export default {
  name: 'Drawer',
  data () {
    return {
      drawer: false,
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
          title: 'Activities',
          to: '/public/activities'
        },
        {
          label: 'Presidents',
          name: 'public-past-presidents',
          title: 'All Presidents',
          to: '/public/past-presidents'
        },
        {
          label: 'Board Resolutions',
          name: 'public-board-of-resolution',
          title: 'Board Resolutions',
          to: '/public/board-of-resolution'
        },
        {
          label: 'Constitution and By-Laws',
          name: 'public-by-laws',
          title: 'CONSTITUTION and BY-LAWS AMENDMENTS',
          to: '/public/by-laws'
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
          label: 'Contact Us',
          name: 'public-contact-us' ,
          title: 'Contact Us',
          to: '/public/contact-us'
        },
        {
          label: 'Postgraduate Registration',
          name: 'public-post-graduate-course' ,
          title: '4th Pangasinan Medical Society Postgraduate Course 2022',
          to: '/public/post-graduate-course'
        }
			]
    }
  },

  computed: {
    selectedItem () {
      let index = ''
      this.navigation.map((items, key) => {
        if (items.name === this.$route.name) index = key
      })
      return index
    }
  }
}
</script>
<style scoped>
.logo {
  width: 95px;
  height: 90px;
  position: relative;
  top: 17px;
}
.sub-logo {
  width: 65px;
  height: 60px;
  position: relative;
  top: 0px;
}
.header {
  color: #10946d;
}
.nav-icon >>> .mdi:before{
  font-size: 35px !important;
}
.login-mobile {
  color: white;
  top: 30px !important;
}
</style>