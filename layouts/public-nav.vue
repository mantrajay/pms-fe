<template>
<div>
  <v-app-bar
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="#10946d"
    :elevation="0"
    dark>
    <v-app-bar-nav-icon
      v-if="!$vuetify.breakpoint.lg"
      @click.stop="drawer = !drawer" />
    <img
      class="logo"
      :src="require('~/assets/nav-logo.png')"/>
    <!-- <img
      class="sub-logo"
      :src="require('~/assets/sub-logo.png')"/> -->
    <div
      class="ml-7"
      v-if="$vuetify.breakpoint.lg">
      <v-btn
        small
        text
        v-for="(nav, index) in navigation"
        :key="index"
        @click="goTo(nav.to)"
        :class="{'active': $route.name == nav.name}">
        {{ nav.text }}
      </v-btn>
      <v-menu
        open-on-hover
        offset-y
        bottom
        origin="center center"
        transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            v-bind="attrs"
            v-on="on"
            :class="
              $route.name == 'public-officers'
                ? 'active'
                : $route.name == 'public-hymn'
                 ? 'active'
                 : $route.name == 'public-past-presidents'
                  ? 'active'
                  : ''
              ">
            About us
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, i) in aboutMenu"
            :key="i"
            link
            @click="goTo(item.route)">
            <v-list-item-title :class="{'active-nav': $route.name === item.name}">{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        class="ml-4"
        @click="goTo('/login')"
        color="purple">
        Login
      </v-btn>
    </div>
    <v-btn
      class="mt-n1"
      color="purple"
      absolute
      top
      right
      v-if="!$vuetify.breakpoint.lg"
      @click="goTo('/login')">
      Login
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    :class="{'navigation': $vuetify.breakpoint.lg}">
    <v-row no-gutters>
      <v-col
        cols="12"
        v-for="(item, index) in navigation"
        :key="index"
        class="pa-1">
        <v-btn
          small
          text
          block
          @click="goTo(item.to)"
          :color="$route.name == item.name ? '#10946d' : ''">
          <span :class="{'active-nav': $route.name === item.name}">{{ item.text }}</span>
        </v-btn>
      </v-col>
      <v-col
        cols="12">
        <v-menu
          open-on-hover
          offset-y
          bottom
          origin="center center"
          transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              :color="
              $route.name == 'public-officers'
                ? '#10946d'
                : $route.name == 'public-hymn'
                 ? '#10946d'
                 : $route.name == 'public-past-presidents'
                  ? '#10946d'
                  : ''
              "
              small
              block
              v-bind="attrs"
              v-on="on">
              About Us
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in aboutMenu"
              :key="i"
              link
              @click="goTo(item.route)">
              <v-list-item-title :class="{'active-nav': $route.name === item.name}">{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Public-Navigation',
  data () {
    return {
      drawer: false,
      showMemberProfile: false,
      showAdminProfile: false,
      collapseOnScroll: true,
      navigation: [
        {
          text: 'Home',
          name: 'index',
          icon: 'mdi-account-group',
          to: '/'
        },
        {
          text: 'Activities',
          name: 'public-activities',
          icon: 'mdi-book-marker-outline',
          to: '/public/activities'
        },
        {
          text: 'Contact Us',
          name: 'public-contact-us',
          icon: 'mdi-account-switch',
          to: '/public/contact-us'
        }
			],
      aboutMenu: [
        { route: '/public/officers', name: 'public-officers', label: 'Officers'},
        { route: '/public/hymn', name: 'public-hymn', label: 'PMA Hymn'},
        { route: '/public/past-presidents', name: 'public-past-presidents', label: 'Past Presidents'}
      ],
      confirm: {
        msg: '',
        show: false,
        loading: false,
        title: 'Confirm',
        variant: 'error'
      }
    }
  },

  computed: {
    ...mapGetters({
      GET_AUTH: 'common/GET_AUTH'
    })
  },

  methods: {
    ...mapMutations({
      SET_ADMIN_INFO: 'common/SET_ADMIN_INFO'
    }),

    confirmLogout () {
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to logout your account?`
    },

    showProfileInfo (){
      if (this.GET_AUTH.roleId == 2){
        this.showMemberProfile = true
        return
      }
      this.showAdminProfile = true
    },

    closeModal () {
      if (this.GET_AUTH.roleId == 2){
        this.showMemberProfile = false
        return
      }
    },

    updateAdmin (data = {}) {
      this.showAdminProfile = false
        this.SET_ADMIN_INFO({
          accountName: data.accountName,
          photo: data.photo
        })
    },

    async logout () {
      this.SET_LOADING()
      setTimeout(() => {
        this.SET_AUTH()
        this.SET_CLOSE_LOADING()
        this.$router.push('/')
      }, 1500)
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
.active-nav {
  color: #10946d !important;
  font-weight: bold;
}
.navigation {
  display: none;
}
.profile-photo {
  width: 20vh;
  height: 20vh;
  border: 1px solid #7777;
}
.label {
  color: #595959;
}
.active {
  background-color: #f5f5f5;
  border-right: 3px solid white;
  color: #10946d;
  font-weight: bold;
}
.active >>> .v-list-item--link:before{
  background-color: #9c27b0 !important;
}
.label-active {
  color: #9c27b0 !important;
}
.v-list-item--dense, .v-list--dense .v-list-item {
  height: 42px;
  min-height: 20px !important;
}
.profile-list {
  cursor: pointer;
}
.profile-list:hover {
  background-color: #e0e0e054;
}
.v-toolbar.v-toolbar--collapsed {
  max-width: 257px !important;
}
.v-application--is-ltr .v-toolbar.v-toolbar--collapsed {
  border-bottom-right-radius: 0px !important;
}
h4 {
  color: #595959;
}
span {
  color: #595959;
  font-size: 10pt;
}
.member {
  font-size: 13px;
  margin-top: 3px;
}
</style>
