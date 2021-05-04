<template>
<div>
  <v-app-bar
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="#10946d"
    dark>
    <v-app-bar-nav-icon
      v-if="!$vuetify.breakpoint.lg"
      @click.stop="drawer = !drawer" />
    <v-icon>
      mdi-stethoscope
    </v-icon>
    <h2>PMS</h2>
    <div
      class="ml-7"
      v-if="$vuetify.breakpoint.lg">
      <v-btn
        small
        text
        v-for="(nav, index) in navigation"
        :key="index"
        @click="goTo(nav.to)"
        :class="{'active-nav': $route.name == nav.name}">
        {{ nav.text }}
      </v-btn>
      <v-btn
        class="ml-4"
        @click="goTo('/login')"
        small
        outlined>
        Login
      </v-btn>
    </div>
    <v-btn
      class="mt-n1"
      absolute
      top
      right
      outlined
      color="#fff"
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
    <v-list
      class="mt-1"
      dense>
      <template v-for="item in navigation">
        <v-list-item
          :key="item.text"
          link
          :class="{'active': $route.name == item.name}"
          :to="item.to">
          <v-list-item-action>
            <!-- <v-icon
              :color="$route.name == item.name ? 'purple' : '#595959'">
              {{ item.icon }}
            </v-icon> -->
          </v-list-item-action>
          <v-list-item-content class="ml-n4">
            <v-list-item-title>
              <span
                class="label"
                :class="{'label-active': $route.name == item.name}">
                {{ item.text }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
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
          text: 'Gallery',
          name: 'public-gallery',
          icon: 'mdi-account-group',
          to: '/public/gallery'
        },
        {
          text: 'Activities',
          name: 'public-activities',
          icon: 'mdi-book-marker-outline',
          to: '/public/activities'
        },
        {
          text: 'About Us',
          name: 'public-about-us',
          icon: 'mdi-cards',
          to: '/public/about-us'
        },
        {
          text: 'Contact Us',
          name: 'public-contact-us',
          icon: 'mdi-account-switch',
          to: '/public/contact-us'
        }
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
.active-nav {
  border-bottom: 1.3px solid #fff;
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
  background-color: #e0e0e054;
  border-right: 3px solid #9c27b0;
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
