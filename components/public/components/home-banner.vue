<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg
      ? '25%'
      : $vuetify.breakpoint.md
       ? '50%'
       : '100%'">
    <v-card :class="!$vuetify.breakpoint.lg ? 'card-banner-mobile' : 'card-banner'">
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="text-right">
            <v-btn
              color="error"
              class="close-btn"
              fab
              small
              @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n14 text-center">
       <v-row>
        <img
          class="banner-img"
          :src="require(`@/assets/banner.jpg`)" />
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="#10946d"
        class="white--text"
        block
        x-large
        @click="$router.push('/public/post-graduate-course')">
        <v-icon>mdi-account-edit</v-icon>
        Register Now
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Home-Banner',
  data() {
    return {
      dialog: true
    }
  }
}
</script>
<style scoped>
.card-banner {
  height: 85% !important;
}
.banner-container {
  text-align: center;
}
.banner-img {
  width: 100%;
  border: 1px solid #7777772e;
}
.card-banner-mobile {
  height: 84% !important;
}
.close-btn {
  position: relative;
  z-index: 2;
  top: -10px;
  right: -23px;
  color: white;
}
</style>