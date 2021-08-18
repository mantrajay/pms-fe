<template>
<div>
  <SkeletonLoading
    :cols="3"
    v-if="loading"/>
  <v-row v-else> 
    <v-col
      cols="12"
      md="3"
      sm="6"
      v-for="(item, index) in anniversaries"
      :key="index">
      <v-hover v-slot="{ hover }">
        <v-card
          class="hover"
          outlined
          @click="showDetails(item)">
          <v-img
            min-height="400"
            max-height="400"
            max-width="100%"
            :lazy-src="require(`@/assets/loading/loading.gif`)"
            :src="require(`@/assets/images/${item.image}`)">
            <v-expand-transition>
              <div
                v-if="hover && $vuetify.breakpoint.lg"
                class="transition-fast-in-fast-out hover-content"
                @click="showDetails(item, 'hover')">
              <div class="hover-label">
                <div v-if="item.imageCount > 0">
                  <v-icon size="50" color="#fff">mdi-book-information-variant</v-icon>
                  <h5>Learn More</h5>
                </div>
                <div v-else>
                  <v-icon size="50" color="#fff">mdi-block-helper</v-icon>
                  <h5>No Available Information</h5>
                </div>
              </div>
              </div>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
  <AniversaryAssets
    @close="showPdfModal = false"
    v-if="showPdfModal"
    :fileDetails="fileDetails" />
</div>
</template>
<script>
import AniversaryAssets from './aniversary-assets'
export default {
  name: 'Home',
  components: {
    AniversaryAssets
  },
  data () {
    return {
      loading: false,
      anniversaries: [],
      showPdfModal: false,
      fileDetails: null
    }
  },

  created () {
    this.fetchAllAnniversaries()
  },

  methods: {
    fetchAllAnniversaries () {
      this.loading = true
      this.API_POST({ url: 'Public_Controller/fetchAllAnniversaries'})
        .then(response => {
          let data = response.data
          this.anniversaries = data
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    },

    showDetails (item) {
      if (item.imageCount <= 0) return
      this.goTo(`/public/aniversary-assets/${item.id}`)
    },
    
    showPdf (item) {
      // if (this.$vuetify.breakpoint.lg) {
      //   window.open(`/${item.file}#toolbar=0`, '_blank')
      //   return
      // }
      this.showPdfModal = true
      this.fileDetails = item
    }
  }
}
</script>
<style scoped>
img {
  width: 50%;
}
.active {
  position: absolute;
  top: -15px;
  right: 6px;
}
.adjust-margin {
  margin-top: 100px !important;
}
.hover-content {
  height: 100%;
  background-color: #10946de6;
  width: 100%;
  text-align: center;
}
.hover-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  font-size: 27px;
}
</style>