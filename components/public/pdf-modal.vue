<template>
<div class="dialog-pdf">
  <v-dialog
    v-model="dialog"
    persistent
    max-width="80%">
    <v-card
      height="700"
      width="100%">
      <v-row>
        <v-col
          cols="10"
          md="10"
          sm="10">
          <h2 :class="{'rezise-text': !this.$vuetify.breakpoint.lg}">{{ fileDetails.title }}</h2>
        </v-col>
        <v-col
          cols="2"
          md="2"
          sm="2"
          class="text-right">
          <v-btn
            color="#10946d"
            text
            @click="$emit('close')">
            Close
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <iframe
          height="700"
          width="100%"
          :src="`${fileDetails.source}#toolbar=0`"
          type="application/pdf" />
        <v-overlay
          class="overlay"
          :absolute="absolute"
          :value="overlay">
        </v-overlay>
      </v-row>
    </v-card>
  </v-dialog>
</div>
</template>
<script>
export default {
  name: 'PDF-Modal',
  props:{
    fileDetails: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      dialog: true,
      absolute: true,
      overlay: true,
    }
  }
}
</script>
<style scoped>
.overlay {
  width: 98%;
  opacity: 0 !important;
  top: 26px
}
iframe {
  margin-top: 5px;
  padding: 0 10px;
}
.v-card {
  overflow: hidden !important;
}
h2 {
  position: relative;
  left: 21px;
  top: 8px;
}
.rezise-text {
  font-size: 12px;
}
</style>
