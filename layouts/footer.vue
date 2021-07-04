<template>
  <v-footer
    dark
    padless>
    <v-card
      class="flex"
      flat
      color="#10946d"
      tile>
      <v-card-title>
        <strong class="subheading">Get connected with us on social media!</strong>
        <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
          @click="openSocialMedia(icon)">
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-2 white--text text-center mt-2">
        <p>&copy; Copyright {{ currentYear }}</p>
        <h4><b>Pangasinan Medical Society</b></h4>
        <p>
          Developed by:
          <span class="copy-text">
            <b>Mantra Jay</b>
          </span>
        </p>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-gmail',
        'mdi-twitter',
        'mdi-youtube',
      ],
    }),
    computed: {
      currentYear () {
        let date = new Date()
        return date.getFullYear()
      }
    },

    methods: {
    openSocialMedia (type = 'mdi-gmail') {
        if (type === 'mdi-facebook') window.open('https://www.facebook.com/Pangasinan-Medical-Society-145503572129650', '_blank')
        if (type === 'mdi-gmail') window.open('https://www.facebook.com/Pangasinan-Medical-Society-145503572129650', '_blank')
        else window.open(`https://mail.google.com/mail/?view=cm&to=jayocumen@gmail.com`, '_blank')
      }
    }
  }
</script>
<style scoped>
p {
  margin: auto;
}
</style>