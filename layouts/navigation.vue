<template>
<div :class="{'nav': $vuetify.breakpoint.lg}">
  <v-app-bar
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="#10946d"
    dark>
    <v-app-bar-nav-icon
      v-if="!$vuetify.breakpoint.lg"
      @click.stop="drawer = !drawer" />
    <v-icon class="mr-2">mdi-stethoscope</v-icon>
    <h2>PMS</h2>
    <v-btn
      class="mt-n1"
      absolute
      top
      text
      right
      color="default"
      @click="confirmLogout">
      <v-icon>mdi-calendar-end</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app>
    <v-row class="mt-n12">
      <v-col
        cols="2"
        sm="2"
        md="2">
        <v-avatar size="40">
          <v-img src="https://scontent.fmnl4-6.fna.fbcdn.net/v/t1.0-9/10425524_10152481831031087_1877481359685655291_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEPS8Rm8qupo5dmXTJJpcVmvSjV3XJGRlO9KNXdckZGU7SD5NAV-Ui4O4iplrV1hIH-zBUFVDR7PZWVYcLELZzs&_nc_ohc=o30DZc-AB14AX92wz6I&_nc_ht=scontent.fmnl4-6.fna&oh=4cab91dd0982b412d51cdf22ad9d43c6&oe=5FF48B4F"></v-img>
        </v-avatar>
      </v-col>
      <v-col
        cols="11"
        sm="11"
        md="11"
        class="text-center mt-n5">
        <v-img
          :lazy-src="require('~/assets/images/avatar.png')"
          class="profile-photo ma-auto"
          :src="GET_AUTH.photo" />
        <h3 class="profile-name purple--text">{{ GET_AUTH.accountName }}</h3>
        <h4
          v-if="GET_AUTH.prcNumber"
          class="profile-name purple--text">
          PRC #{{ GET_AUTH.prcNumber }}
        </h4>
        <div
          class="mt-2"
          v-if="GET_AUTH.roleId != 1">
          <div
            v-if="GET_AUTH.membership"
            class="mt-1">
            <v-chip
              class="white--text"
              color="purple">
              {{ GET_AUTH.membership }}
            </v-chip>
          </div>
          <div
            class="mt-1"
            v-if="GET_AUTH.chapter">
            <v-chip
              class="white--text"
              color="purple">
              {{ GET_AUTH.chapter }}
            </v-chip>
          </div>
        </div>
        <v-btn
          class="mt-2 white--text"
          color="purple"
          outlined
          small
          @click="showProfileInfo">
          Update Profile
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-6"></v-divider>
    <v-list
      class="mt-1"
      dense>
      <template v-for="item in navItems">
        <v-list-item
          :key="item.text"
          link
          :class="{'active': $route.name == item.name}"
          :to="item.to">
          <v-list-item-action>
            <v-icon
              :color="$route.name == item.name ? 'purple' : '#595959'">
              {{ item.icon }}
            </v-icon>
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
  <AlertCallBack
    v-if="confirm.show"
    :callBack="confirm"
    @close="confirm.show = false"
    @event="logout"/>
  <MemberInfo
    @close="closeModal"
    :memberId="GET_AUTH.userId"
    v-if="showMemberProfile || GET_AUTH.isInfoUpdated && GET_AUTH.roleId == 2"
    :isPorfile="GET_AUTH.isInfoUpdated"/>
  <UpdateAdminInfo
    v-if="showAdminProfile"
    :userId="GET_AUTH.userId"
    setting="update"
    :isOwnProfile="true"
    :isProfile="true"
    @close="showAdminProfile = false"
    @event="updateAdmin"/>
</div>
</template>
<script>
import MemberInfo from './member-info'
import ProfileButtons from './profile-buttons'
import UpdateAdminInfo from '~/components/modules/administrators/components/create-update'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Navigation',
  components: {
    ProfileButtons,
    MemberInfo,
    UpdateAdminInfo
  },
  data () {
    return {
      drawer: true,
      showMemberProfile: false,
      showAdminProfile: false,
      collapseOnScroll: true,
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
    }),

    navItems () {
      if (this.GET_AUTH.roleId == 1) {
        let navList = [
          {
            text: 'Dashboard',
            name: 'dashboard',
            icon: 'mdi-gauge',
            to: '/dashboard'
          },
          {
            text: 'Arrears',
            name: 'annual',
            icon: 'mdi-cards',
            to: '/annual'
          },
          {
            text: 'Activities',
            name: 'activities',
            icon: 'mdi-book-marker-outline',
            to: '/activities'
          },
          {
            text: 'Other Fees',
            name: 'other-fees',
            icon: 'mdi-account-switch',
            to: '/other-fees'
          },
          {
            text: 'Members',
            name: 'members',
            icon: 'mdi-account-group',
            to: '/members'
          },
          {
            text: 'Administrators',
            name: 'administrators',
            icon: 'mdi-account-supervisor-circle',
            to: '/administrators'
          },
          {
            text: 'Chapters',
            name: 'chapters',
            icon: 'mdi-map-marker-radius',
            to: '/chapters',
          },
          {
            text: 'Type of Membership',
            name: 'memberships',
            icon: 'mdi-badge-account-outline',
            to: '/memberships',
          }
        ]
        if (this.GET_AUTH.userId == 257) {
          navList.push({
            text: 'Logs',
            name: 'Logs',
            icon: 'mdi-format-align-justify',
            to: '/logs',
          },
          {
            text: 'Reset Password Request',
            name: 'Reset Password',
            icon: 'mdi-pin',
            to: '/reset-password',
          })
        }
        return navList
      } else {
        return [
          {
            text: 'Dashboard',
            name: 'dashboard',
            icon: 'mdi-gauge',
            to: '/dashboard'
          },
          {
            text: 'Arrears',
            name: 'annual',
            icon: 'mdi-cards',  
            to: '/annual'
          },
          {
            text: 'Activities',
            name: 'activities',
            icon: 'mdi-book-marker-outline',
            to: '/activities'
          },
          {
            text: 'Other Fees',
            name: 'other-fees',
            icon: 'mdi-account-switch',
            to: '/other-fees'
          }
        ]
      }
    }
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
.nav >>> header {
  width: 256px;
}
.profile-photo {
  width: 7em;
  height: 7em;
  /* border: 1px solid #7777; */
  border-radius: 4px;
  margin-top: -10px;
}
.profile-photo >>> .v-image__image--preload {
  filter: blur(0px) !important;
}
.profile-name {
  font-family: system-ui;
}
.label {
  color: #595959;
}
.active {
  background-color: #e0e0e054;
  border-left: 3px solid #9c27b0;
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
