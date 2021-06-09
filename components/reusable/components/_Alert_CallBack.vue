<template>
  <v-dialog v-model="dialog"
    persistent
    max-width="450">
    <v-card :id="callBack.variant">
      <v-card-title>
        <h4 :class="`dialog-${callBack.variant}`">{{ callBack.title }}</h4>
      </v-card-title>
      <v-card-text
        v-if="callBack.loading"
        v-html="`Processing, Please wait....`"
        class="mt-5" />
      <v-card-text
        v-else
        v-html="callBack.msg"
        class="mt-5" />
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!callBack.loading"
          :color="callBack.variant"
          text
          @click="$emit('close')">
          <b>{{ closeBtn }}</b>
        </v-btn>
        <v-btn
          :color="callBack.variant"
          elevation="0"
          :loading="callBack.loading"
          @click="$emit('event')">
          <b>{{ okBtn }}</b>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'CallBack',
  props: {
    callBack: {
      type: Object,
      default: null
    },

    closeBtn: {
      type: String,
      default: 'Cancel'
    },

    okBtn: {
      type: String,
      default: 'Yes'
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