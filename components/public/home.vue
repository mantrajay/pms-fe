<template>
<div :class="{'adjust-margin': !$vuetify.breakpoint.lg}">
  <SkeletonLoading
    :cols="6"
    v-if="loading"/>
  <v-row v-else> 
    <v-col
      cols="12"
      md="3"
      sm="3"
      v-for="(item, index) in anniversaries"
      :key="index">
      <v-card outlined>
        <v-img
          min-height="300"
          max-width="100%"
          :lazy-src="require(`@/assets/loading/loading.gif`)"
          :src="require(`@/assets/images/${item.image}`)" />
        <!-- <v-card-title
          class="text-h6 pa-4"
          v-text="stringLimit(item.title, 55)" />
        <v-card-subtitle
          class="pl-4 pr-4 mt-1"
          v-text="item.description" /> -->
        <div class="pa-1">
          <v-btn
            block
            :disabled="!parseInt(item.isFile)"
            color="#10946d"
            @click="showPdf(item)"
            class="mb-1 white--text">
            Learn More
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <PDFModal
    @close="showPdfModal = false"
    v-if="showPdfModal"
    :fileDetails="fileDetails" />
</div>
</template>
<script>
import PDFModal from './pdf-modal'
export default {
  name: 'Home',
  components: {
    PDFModal
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
</style>