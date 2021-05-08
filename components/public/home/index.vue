<template>
<v-card
  min-height="25vh"
  elevation="0"
  class="pa-15">
  <v-card-text>
    <v-row>
      <v-col
        cols="12"
        md="12"
        sm="12"
        class="text-center">
        <h2>{{ $route.name }}</h2>
        <img
          :src="require('~/assets/development.png')"/>
        <h1>UNDER CONSTRUCTION</h1>
        <h3 class="mt-5">
          To login your account please
          <v-btn
            @click="goTo('/login')"
            outlined
            small
            color="primary">
            Click Here
          </v-btn>
        </h3>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
img {
  width: 50%;
}
</style>