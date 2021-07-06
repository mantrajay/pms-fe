<template>
<div>
  <div class="d-flex">
    <v-app-bar-nav-icon
      class="mt-2 nav-icon"
      color="#10946d"
      @click="drawer = !drawer"/>
    <v-img
      max-width="60"
      max-height="60"
      class="mt-n1 ml-2"
      :src="require('~/assets/logo.png')"/>
    <v-img
      max-width="50"
      max-height="50"
      class="mt-1 ml-1"
      :src="require('~/assets/sub-logo.png')"/>
    <h1 class="ml-2 mt-3 header">PMS</h1>
    <v-spacer></v-spacer>
    <v-btn
      absolute
      right
      class="white--text mt-2"
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
  font-size: 40px !important;
}
</style>