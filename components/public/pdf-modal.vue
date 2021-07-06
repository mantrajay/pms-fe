<template>
<v-dialog
  v-model="dialog"
  fullscreen>
  <v-card outlined>
    <v-toolbar
      color="#10946d"
      dark
      elevation="0">
      <p :class="{'rezise-text': !$vuetify.breakpoint.lg}">{{ stringLimit(fileDetails.title, 65) }}</p>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="white"
        @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
   <v-row>
    <v-col
      cols="12"
      md="2"
      sm="2" />
     <v-col
      cols="12"
      md="8"
      sm="8"
      class="text-center pa-3">
      <div
        class="loading"
        v-if="show && fileDetails.file">
        <v-progress-circular
          class="mt-16"
          :value="loadedRatio"
          color="#10946d"
          :rotate="360"
          :size="100"
          :width="15">
          {{ loadedRatio }}%
        </v-progress-circular>
        <h3 class="mt-3">Loading PDF</h3>
      </div>
      <h4 class="mt-5">{{ fileDetails.description }}</h4>
      <pdf
        v-show="!show"
        class="pdf"
        v-for="index in numPages"
        :key="index"
        :src="fileDetails.file"
        :page="index"
        @loaded="pageLoaded"
        @page-loaded="pdfLoaded">
      </pdf>
     </v-col>
    <v-col
      cols="12"
      md="2"
      sm="2" />
   </v-row>
  </v-card>
</v-dialog>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'PDF-Modal',
  components: {
    pdf
  },
  props:{
    fileDetails: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      dialog: true,
      loadedRatio: 0,
      numPages: 0,
      show: true
    }
  },

  created () {
    const loadingTask = pdf.createLoadingTask(this.fileDetails.file)
		loadingTask.promise.then(pdf => {
			this.numPages = pdf.numPages + 5
		})
	},

  methods: {
    pdfLoaded () {
      this.show = false
    },

    pageLoaded () {
      this.loadedRatio++
    }
  }
}
</script>
<style scoped>
.pdf {
  width: 100%;
  margin: 2px;
}
.rezise-text {
  margin-top: 15px;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>