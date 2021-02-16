<template>
  <v-dialog v-model="dialog"
    persistent
    max-width="450">
    <v-card :id="alert.variant">
      <v-card-title>
        <h4 :class="`dialog-${alert.variant}`">{{ alert.title }}</h4>
      </v-card-title>
      <v-card-text
        v-html="alert.msg"
        class="mt-5" />
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="12">
              {{ alert.message }}
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
              :class="{'mt-n7': index > 0}"
              v-for="(items, index) in  alert.data"
              :key="index">
              <p>{{ items.name }} - {{ items.year }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!alert.loading"
          :color="alert.variant"
          text
          @click="$emit('close')">
          <b>Close</b>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'Alert-Data',
  props: {
    alert: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      dialog: true
    }
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