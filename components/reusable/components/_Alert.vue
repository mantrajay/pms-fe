<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="GET_ALERT.toggle"
    persistent
    max-width="450">
    <v-card :id="GET_ALERT.variant">
      <v-card-title>
        <h4 :class="`dialog-${GET_ALERT.variant}`">{{ GET_ALERT.title.toUpperCase() }}</h4>
      </v-card-title>
      <v-card-text v-html="GET_ALERT.message"
        class="mt-5" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="GET_ALERT.variant"
          text
          @click="SET_ALERT_CLOSE()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Alert',
  computed: {
    ...mapGetters({
      GET_ALERT: 'common/GET_ALERT'
    })
  }
}
</script>
<style scoped>
#success >>> .v-card__title {
  border-bottom: 2px solid #4caf50 !important;
  height: 45px;
}
#error >>> .v-card__title {
  border-bottom: 2px solid red !important;
  height: 45px;
}
#warning >>> .v-card__title {
  border-bottom: 2px solid #fb8c00 !important;
  height: 45px;
}
#primary >>> .v-card__title {
  border-bottom: 2px solid #1f89e5 !important;
  height: 45px;
}
.dialog-success {
  color: #4caf50;
  margin-top: -11px;
}
.dialog-error {
  color: red;
  margin-top: -11px;
}
.dialog-warning {
  color: #fb8c00;
  margin-top: -11px;
}
.dialog-primary {
  color: #1f89e5;
  margin-top: -11px;
}
</style>