<template>
  <v-row>
    <v-col
      cols="12"
      md="3"
      sm="3">
    </v-col>
    <v-col
      cols="12"
      md="6"
      sm="6"
      class="text-center mt-12">
      <v-card
        min-height="25vh"
        elevation="0">
        <v-card-text>
          <v-icon
            color="success"
            x-large>
            mdi-tools
          </v-icon>
        </v-card-text>
        <v-card-text class="headline">
          This page is under development!
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="3"
      sm="3">
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Home'
}
</script>