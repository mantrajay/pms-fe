<template>
<v-row> 
  <v-col
    cols="12"
    md="12"
    sm="12">
    <v-card class="mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.6043783113457!2d120.32863013941707!3d16.043809776085883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33915d5810d00933%3A0xfb5377a578ccb68e!2sPangasinan%20Medical%20Society!5e0!3m2!1sen!2sph!4v1624441030647!5m2!1sen!2sph"
        allowfullscreen=""
        class="map"
        loading="lazy">
      </iframe>
      <v-container
        class="pa-7"
        fluid>
        <v-row>
          <v-col
            cols="12"
            md="5"
            sm="5">
            <h3>Address</h3>
            <p class="mt-2">AB Fernandez Avenue (near LTO) (124.03 mi)</p>
            <p class="mt-n4">Dagupan City, Philippines, 2400</p>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="4">
            <h3>Telefax No.</h3>
            <p class="mt-2">(075) 515 4510</p>
          </v-col>
          <v-col
            cols="12"
            md="3"
            sm="3">
            <h3>Social Media</h3>
            <v-icon
              size="40px"
              color="primary"
              @click="openSocialMedia('fb')">
              mdi-facebook
            </v-icon>
            <v-icon
              size="40px"
              color="error"
              @click="openSocialMedia('gmail')">
              mdi-gmail
            </v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-col>
</v-row>
</template>
<script>
export default {
  name: 'Contact-Us',
  data () {
    return {
    }
  },

  methods: {
    openSocialMedia (type = 'gmail') {
      if (type === 'fb') window.open('https://www.facebook.com/Pangasinan-Medical-Society-145503572129650', '_blank')
      else window.open(`https://mail.google.com/mail/?view=cm&to=jayocumen@gmail.com`, '_blank')
    }
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 70vh;
  border: none;
}
</style>