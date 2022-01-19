<template>
<v-row>
  <v-col
    cols="12"
    md="4"
    sm="4">
  </v-col>
  <v-col
    cols="12"
    md="4"
    sm="4">
    <v-card
      outlined>
      <div v-if="isCodeValid">
        <v-card-text class="text-center">
          <img
            class="congrats"
            :src="require('@/assets/congrats.gif')">
          <h1 class="congrats-text">CONGRATULATIONS</h1>
        </v-card-text>
        <v-card-text class="pl-10 pr-10 pb-10">
          <h3>Registration Code: {{ $route.params.id }}</h3>
          <div class="mt-2">Thank you very much for registering 4TH PANGASINAN MEDICAL SOCIETY POSTGRADUATE COURSE 2022.</div>
          <div class="mt-2">We have sent you an email for this transaction.</div>
        </v-card-text>
      </div>
      <div
        class="text-center mt-5"
        v-else>
          <v-card-text class="pl-10 pr-10 pb-10">
          <h1 class="error--text">Oops! Sorry.</h1>
          <div class="mt-2">Page does not contain data</div>
        </v-card-text>
      </div>
    </v-card>
  </v-col>
  <v-col
    cols="12"
    md="4"
    sm="4">
  </v-col>
</v-row>
</template>
<script>
export default {
  layout: 'public',
  name: 'Congrats',
  data () {
    return {
      isCodeValid: '',
      loading: false
    }
  },

  fetch() {
    this.validateCode()
  },

  methods: {
    validateCode() {
      this.loading = true
      this.API_POST({ url: `Registration/validateCode/${this.$route.params.id}`})
        .then(response => {
          this.isCodeValid = response.data
        }).catch(error => {  })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
<style scoped>
.congrats {
  width: 50%;
}
.congrats-text {
  color: rgb(16, 148, 109);
}
</style>