<template>
<v-dialog
  v-model="dialog"
  fullscreen>
  <v-card outlined>
    <v-toolbar
      color="#10946d"
      dark
      elevation="0">
      <v-btn
        absolute
        right
        text
        color="white"
        @click="$emit('close')">
        Close
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
      class="text-center">
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
      <div
        class="pl-2 pr-2"
        :class="{'mt-5': $vuetify.breakpoint.lg}">
        <h2>{{ stringLimit(fileDetails.title, 65) }}</h2>
        <h4 class="mt-2">{{ fileDetails.description }}</h4>
      </div>
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
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
p {
  margin: auto;
}
</style>