<template>
<div>
  <v-app-bar
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="primary"
    dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-icon class="mr-2">mdi-stethoscope</v-icon>
    <h2>PMS</h2>
    <v-btn
        class="mt-n1"
        absolute
        top
        right
        color="default"
        outlined
        @click="confirmLogout">
        <v-icon>mdi-calendar-end</v-icon>
        Logout
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
        class="text-center">
        <div class="user-logo-wrapper">
          <v-img
            class="user-logo"
            :lazy-src="require('@/assets/images/avatar.svg')"
            :src="GET_AUTH.photo" />
        </div>
        <h4 class="mt-3">{{ GET_AUTH.accountName }}</h4>
        <div
          class="mt-2"
          v-if="GET_AUTH.roleId != 1">
          <div
            v-if="GET_AUTH.membership"
            class="mt-1">
            <v-chip color="success">
              {{ GET_AUTH.membership }}
            </v-chip>
          </div>
          <div
            class="mt-1"
            v-if="GET_AUTH.chapter">
            <v-chip color="success">
              {{ GET_AUTH.chapter }}
            </v-chip>
          </div>
        </div>
        <v-btn
          class="mt-2"
          text
          @click="showProfile = true">
          Update Profile
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-list
      class="mt-1"
      dense>
      <template v-for="item in navItems">
        <v-list-item
          :key="item.text"
          link
          :class="{'active': $route.name === item.text.toLowerCase()}"
          :to="item.to">
          <v-list-item-action>
            <v-icon
              :color="$route.name === item.text.toLowerCase() ? 'primary' : '#595959'">
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content class="ml-n4">
            <v-list-item-title>
              <span
                class="label"
                :class="{'label-active': $route.name === item.text.toLowerCase()}">
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
  <UserInfo
    @close="showProfile = false"
    :memberId="GET_AUTH.userId"
    :isPorfile="true"
    v-if="showProfile"/>
</div>
</template>
<script>
import ProfileButtons from './profile-buttons'
import { mapGetters } from 'vuex'
import UserInfo from '~/components/modules/activities/list-activities/components/user-info'
export default {
  name: 'Navigation',
  components: {
    ProfileButtons,
    UserInfo
  },
  data () {
    return {
      drawer: true,
      showProfile: false,
      collapseOnScroll: true,
      items: [
        {
          text: 'Members',
          icon: 'mdi-account-group',
          to: '/members'
        },
        {
          text: 'Activities',
          icon: 'mdi-book-marker-outline',
          to: '/activities'
        },
        {
          text: 'Annual Fee',
          icon: 'mdi-cards',
          to: '/annual'
        },
        {
          text: 'Other Fees',
          icon: 'mdi-account-switch',
          to: '/other-fees'
        },
        {
          text: 'Chapters',
          icon: 'mdi-map-marker-radius',
          to: '/chapters',
        },
        {
          text: 'Membership',
          icon: 'mdi-badge-account-outline',
          to: '/memberships',
        },
        {
          text: 'Administrators',
          icon: 'mdi-account-supervisor-circle',
          to: '/administrators'
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
    }),

    navItems () {
      if (this.GET_AUTH.roleId == 1) {
        return this.items
      } else {
        return [
          {
            text: 'Activities',
            icon: 'mdi-book-marker-outline',
            to: '/activities'
          },
          {
            text: 'Annual Fee',
            icon: 'mdi-cards',
            to: '/annual'
          },
          {
            text: 'Other Fees',
            icon: 'mdi-account-switch',
            to: '/other-fees'
          }
        ]
        
      }
    }
  },

  methods: {
    confirmLogout () {
      this.confirm.show = true
      this.confirm.msg = `Are you sure you want to logout your account?`
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
.user-logo-wrapper {
  width: 40%;
  margin: auto;
}
.user-logo >>> .v-image__image--preload{
  filter: blur(0px) !important;
}
.label {
  color: #595959;
}
.active {
  background-color: #e0e0e054;
  border-right: 3px solid #34a3f3;
}
.active >>> .v-list-item--link:before{
  background-color: #619fdd !important;
}
.label-active {
  color: #1976d2 !important;
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
