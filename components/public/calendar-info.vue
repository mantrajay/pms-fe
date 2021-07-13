<template>
  <v-dialog v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg ? '30%' : '100%'">
    <v-card outlined>
      <v-app-bar
        color="#10946d"
        flat>
        <v-toolbar-title class="text-h6 white--text pl-0">
          {{ activity.name }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('close')"
          color="white"
          icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text class="mt-3">
        <p><b>Sponsor:</b> {{ activity.sponsor }}</p>
        <p><b>Speaker:</b> {{ activity.speaker_name }}</p>
        <p><b>Venue:</b> {{ activity.venue }}</p>
        <p><b>Start:</b> {{ dateFormat(activity.start_time) }}</p>
        <p><b>End:</b> {{ dateFormat(activity.end_time) }}</p>
      </v-card-text>
    </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Activity-Info',
  props:{
    activity: {
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
p {
  margin: auto;
  font-size: 13px;
}
</style>