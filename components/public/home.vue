<template>
<div>
  <v-row> 
    <v-col
      cols="12"
      md="4"
      sm="4"
      v-for="(item, index) in items"
      :key="index">
      <v-card class="mx-auto">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="require(`@/assets/images/${item.image}`)">
          <v-btn
            v-if="!index"
            small
            fab
            class="white--text mt-5 active"
            color="purple">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-img>
        <v-card-text class="text--primary">
          <div>{{ stringLimit(item.title, 50) }}</div>
        </v-card-text>
        <v-card-subtitle class="mt-n5">
          <p>June 27, 2021</p>
          <p class="mt-n4">Alaminos Convention Center</p>
          <p class="mt-n4">Alaminos Pangasinan</p>
        </v-card-subtitle>
        <v-card-actions class="mt-n2">
          <v-btn
            @click="showPdf(item)"
            :disabled="!item.isAvailable"
            class="white--text"
            color="rgb(16, 148, 109)">
            Learn More
          </v-btn>
        </v-card-actions>
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
      items: [
        {
          color: 'purple',
          icon: 'mdi-buffer',
          image: '95th.jpg',
          title: '95th Founding Anniversary 2nd Hybrid Induction Ceremonies',
          description: '“Moving on Through New Normal with HOPE, Resilience and Compassion”',
          source: '',
          isAvailable: false 
        },
        {
          color: 'purple',
          icon: 'mdi-buffer',
          image: '94th.jpg',
          title: '94th Anniversary & 1st Virtual/Hybrid Induction Ceremonies',
          description: '“Moving on Through New Normal with HOPE, Resilience and Compassion”',
          source: 'pavo.pdf',
          isAvailable: true 
        },
        {
          color: 'purple',
          icon: 'mdi-buffer',
          image: '93rd.jpg',
          title: '93rd Anniversary Hybrid Induction Ceremonies',
          description: '“Moving on Through New Normal with HOPE, Resilience and Compassion”',
          source: '',
          isAvailable: false 
        },
        {
          color: 'purple',
          icon: 'mdi-buffer',
          image: '92nd.jpg',
          title: '92nd Anniversary Hybrid Induction Ceremonies',
          description: '“Moving on Through New Normal with HOPE, Resilience and Compassion”',
          source: '',
          isAvailable: false 
        }
      ],
      showPdfModal: false,
      fileDetails: null
    }
  },

  methods: {
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
</style>