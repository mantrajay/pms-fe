<template>
  <v-dialog v-model="GET_LOADING.toggle"
    persistent
    max-width="290">
    <v-card id="primary">
      <v-card-title>
        <h5 class="dialog-primary">{{ GET_LOADING.title }}</h5>
      </v-card-title>
      <v-card-text class="mt-5">
        <v-progress-linear
          color="primary"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'Alert'
}
</script>
<style scoped>
#primary >>> .v-card__title {
  border-bottom: 2px solid #1f89e5 !important;
  height: 45px;
}
.dialog-primary {
  color: #1f89e5;
  margin-top: -11px;
}
</style>