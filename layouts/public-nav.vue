<template>
  <v-card
    color="white"
    class="card-nav text-center"
    :elevation="0">
    <v-card-title
      v-if="$vuetify.breakpoint.lg"
      class="nav-logos">
      <v-img
        max-width="150"
        max-height="120"
        :src="require('~/assets/nav-logo.png')"/>
      <h2 class="nav-title">Pangasinan Medical Society</h2>
      <v-spacer></v-spacer>
      <div
        absolute
        right>
        <v-btn
          center
          text
          :loading="loadingHeart"
          color="error"
          @click="heartUnHeart">
          <v-icon v-if="LIKE_HEART.heart === 'heart'">
            mdi-heart
          </v-icon>
          <v-img
            v-else
            height="45"
            width="45"
            :src="require('~/assets/heart.gif')" />
          <b class="ml-1">{{ heartCount }}</b>
        </v-btn>
        <v-btn
          :loading="loadingLike"
          color="primary"
          text
          @click="likeUnlike">
          <v-icon v-if="LIKE_HEART.like === 'like'">
            mdi-thumb-up
          </v-icon>
          <v-img
            v-else
            height="45"
            width="45"
            :src="require('~/assets/like.gif')" />
          <b class="ml-1">{{ likedCount }}</b>
        </v-btn>
        <v-btn
          v-if="$vuetify.breakpoint.lg"
          elevation="0"
          class="white--text"
          color="#10946d"
          @click="goTo('/login')">
          Login
        </v-btn>
      </div>
    </v-card-title>
    <v-card-title
      :class="{
        'border-nav-lg': $vuetify.breakpoint.lg,
        'scrolled': scrolled > 125
      }"
      class="border-nav mt-n1">
      <v-row class="nav-position">
        <v-col
          cols="12"
          md="12"
          sm="12"
          class="text-left ml-3 d-flex">
          <Drawer v-if="!$vuetify.breakpoint.lg"/>
          <v-img
            v-if="scrolled > 125 && $vuetify.breakpoint.lg"
            class="mt-n2"
            max-width="52"
            max-height="52"
            :src="require('~/assets/logo.png')"/>
          <div v-if="$vuetify.breakpoint.lg">
            <v-btn
              small
              color="#10946d"
              text
              v-for="(nav, index) in navigation"
              :key="index"
              @click="goTo(nav.to)"
              :class="{'active': $route.name == nav.name}">
              {{ nav.label }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-title
      v-if="!$vuetify.breakpoint.lg"
      class="border-nav-lg mt-n5 nav-logos">
      <div class="like-heart">
        <v-btn
          center
          text
          :loading="loadingHeart"
          color="error"
          @click="heartUnHeart">
          <v-icon v-if="LIKE_HEART.heart === 'heart'">
            mdi-heart
          </v-icon>
          <v-img
            v-else
            height="45"
            width="45"
            :src="require('~/assets/heart.gif')" />
          <b class="ml-1">{{ heartCount }}</b>
        </v-btn>
        <v-btn
          :loading="loadingLike"
          color="primary"
          text
          @click="likeUnlike">
          <v-icon v-if="LIKE_HEART.like === 'like'">
            mdi-thumb-up
          </v-icon>
          <v-img
            v-else
            height="45"
            width="45"
            :src="require('~/assets/like.gif')" />
          <b class="ml-1">{{ likedCount }}</b>
        </v-btn>
        <v-btn
          v-if="$vuetify.breakpoint.lg"
          elevation="0"
          class="white--text"
          color="#10946d"
          @click="goTo('/login')">
          Login
        </v-btn>
      </div>
    </v-card-title>
    <v-img
      height="260px"
      :aspect-ratio="1"
      :lazy-src="require(`@/assets/loading/loading.gif`)"
      :src="require('~/assets/page-logo.jpg')">
      <p class="align-title white--text">
        {{ titlePage.toUpperCase() }}
      </p>
     </v-img>
  </v-card>
</template>
<script>
import Drawer from './drawer'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Sub-Navigation',
  components: {
    Drawer
  },

  props: {
    scrolled: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      likedCount: '',
      heartCount: '',
      loading: false,
      loadingLike: false,
      loadingHeart: false,
      showSuccess: false,
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
          label: 'Board of Resolutions',
          name: 'public-board-of-resolution',
          title: 'Board of Resolutions',
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
        }
			]
    }
  },

  computed: {
    ...mapGetters({
      LIKE_HEART: 'common/LIKE_HEART',
    }),

    titlePage () {
      let title = ''
      this.navigation.map((items, key) => {
        if (items.name === this.$route.name) title = items.title
      })
      return title
    }
  },

  created () {
    this.fetchLikeHeartCount()
  },

  methods: {
    ...mapMutations({
      SET_LIKE: 'common/SET_LIKE',
      SET_HEART: 'common/SET_HEART'
    }),
  
    fetchLikeHeartCount() {
      this.loading = true
      this.API_POST({ url: 'Public_Controller/getLikeHeartCount'})
        .then(response => {
          let data = response.response
          this.likedCount = data.like
          this.heartCount = data.heart
        }).catch(error => {  })
        .finally(() => {
          this.loading = false
        })
    },

    likeUnlike() {
      this.loadingLike = true
      let like = this.LIKE_HEART.like === ''
        ? 'like'
        : this.LIKE_HEART.like === 'like'
          ? 'un-like'
          : this.LIKE_HEART.like === 'un-like'
           ? 'like'
           : ''
      let formData = new FormData()
      formData.append('type', like)
      this.API_POST({
        url: 'Public_Controller/likeUnlike',
        data: formData
      })
      .then(response => {
        let data = response.response
        this.fetchLikeHeartCount()
        this.SET_LIKE(like)
       if (like === 'like') {
          this.showSuccess = true
          setTimeout(() => {
            this.showSuccess = false
          }, 800)
        }
      }).catch(error => {  })
      .finally(() => { this.loadingLike = false })

    },

    heartUnHeart() {
      this.loadingHeart = true
      let heart = this.LIKE_HEART.heart === ''
        ? 'heart'
        : this.LIKE_HEART.heart === 'heart'
          ? 'un-heart'
          : this.LIKE_HEART.heart === 'un-heart'
           ? 'heart'
           : ''
      let formData = new FormData()
      formData.append('type', heart)
      this.API_POST({
        url: 'Public_Controller/heartUnHeart',
        data: formData
      })
      .then(response => {
        this.fetchLikeHeartCount()
        this.SET_HEART(heart)
        if (heart === 'heart') {
          this.showSuccess = true
          setTimeout(() => {
            this.showSuccess = false
          }, 800)
        }
      }).catch(error => {  })
      .finally(() => { this.loadingHeart = false })
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
  /* height: 105px; */
  background-color: white;
}
.scrolled {
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
}
.border-nav-lg {
  border-bottom: 5px solid #ffb463;
  height: 70px !important;
}
.align-title {
  margin-top: 100px !important;
  font-size: 29px;
  font-weight: bold;
}
.actions-large {
  position: absolute;
  right: 125px;
  top: 12px;
}
.actions-sm {
  position: absolute;
  right: 5px !important;
  top: 62px !important;
}
.nav-position {
  margin-top: -10px;
}
.nav-logos {
  background-color: white;
  margin-top: -10px;
}
.nav-title {
  color: #10946d;
  margin-top: 10px;
  margin-left: 5px;
}
.like-heart {
  margin: auto;
}
</style>