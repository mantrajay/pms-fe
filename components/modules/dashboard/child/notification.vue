<template>
<div>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    persistent
    max-width="80%">
    <v-card>
      <v-card-title>
      </v-card-title>
    </v-card>
  </v-dialog>
</div>
</template>
<script>
export default {
  name: 'Notification',
  data() {
    return {
      dialog: true
    }
  }
}
</script>
<style scoped>
.dotted {
  border-top: 2px #7777 dotted !important;
}
h4 {
  color: #686565;
}
</style>