<template>
<div :class="{'adjust-margin': !$vuetify.breakpoint.lg}">
  <v-row> 
    <v-col
      cols="12"
      md="6"
      sm="6"
      v-for="(item, index) in anniversaries"
      :key="index">
      <v-card outlined>
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="6">
            <v-img
              :lazy-src="require(`@/assets/loading/loading.gif`)"
              :src="require(`@/assets/images/${item.image}`)" />
          </v-col>
          <v-col
            cols="12"
            md="6"
            sm="6"
            class="pa-2">
            <v-card-title
              class="text-h4 pa-8"
              v-text="item.title" />
            <v-card-subtitle
              class="mt-1 pl-8 pr-8"
              v-text="item.description" />
            <v-btn
              :disabled="item.isFile"
              color="primary"
              class="mt-2 ml-8 mb-10">
              Learn More
            </v-btn>
          </v-col>
        </v-row>
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
      // if (!this.$vuetify.breakpoint.lg) {
      //   window.open(`/${item.source}#toolbar=0`, '_blank')
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