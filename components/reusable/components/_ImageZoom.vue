<template>
  <v-dialog
    v-model="dialog"
    persistent
    fullscreen
    max-width="290"
  >
    <v-card
      class="pa-10"
      outlined>
      <v-toolbar elevation="0">
        <v-row>
          <v-col class="text-center">
            <v-btn
              color="#10946d"
              @click="$emit('close')">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-row>
        <v-col
          cols="12"
          md="2"
          sm="2" />
        <v-col
          cols="12"
          md="8"
          sm="8">
          <v-img
            :lazy-src="require(`@/assets/loading/loading.gif`)"
            :src="src" />
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
export default {
  name: 'Image-Zoom',
  props: {
    src: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      dialog: true
    }
  }
}
</script>