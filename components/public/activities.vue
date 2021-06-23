<template>
<v-row>
  <v-col
    v-if="loading"
    cols="12"
    md="12"
    sm="12">
    <div class="loading">
      <v-progress-circular
        indeterminate
        size="50"
        color="#10946d"
      ></v-progress-circular>
      <h5 class="mt-4">Loading</h5>
    </div>
  </v-col>
  <v-col
    v-else
    cols="12"
    md="12"
    sm="12">
    <v-timeline
      :reverse="reverse"
      :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item
        v-for="(item, index) in activities"
        :key="index"
        :color="
          Date.parse(item.start_time) > Date.parse(new Date())
            ? '#10946d'
            : Date.parse(dateFormat(item.start_time, 'MMM D, YYYY')) === dateNow
              ? '#e39500'
              : 'purple'
            "
        icon="mdi-calendar"
        fill-dot>
        <v-chip
          :color="
            Date.parse(item.start_time) > Date.parse(new Date())
              ? '#10946d'
              : Date.parse(dateFormat(item.start_time, 'MMM D, YYYY')) === dateNow
                ? '#e39500'
                : 'purple'
              "
          class="white--text"
          slot="opposite">
          <b>{{ 
            Date.parse(item.start_time) > Date.parse(new Date())
              ? 'Upcomming'
              : Date.parse(dateFormat(item.start_time, 'MMM D, YYYY')) === dateNow
                ? 'Ongoing'
                : 'Finished'
          }}</b>
        </v-chip>
        <v-card-title class="text-h6 white--text"
          :class="
          Date.parse(item.start_time) > Date.parse(new Date())
            ? 'upcomming'
            : Date.parse(dateFormat(item.start_time, 'MMM D, YYYY')) === dateNow
              ? 'ongoing'
              : 'purple'
            ">
          <b>{{ item.name }}</b>
        </v-card-title>
        <v-card class="elevation-2 mt-2">
          <v-row>
            <v-col
              cols="12"
              md="7"
              sm="7">
              <v-card-text>
                <p><b>Sponsor:</b> {{ item.sponsor }}</p>
                <p><b>Speaker:</b> {{ item.speaker_name }}</p>
                <p><b>Venue:</b> {{ item.venue }}</p>
                <p><b>Start Time:</b> {{ dateFormat(item.start_time) }}</p>
                <p><b>End Time:</b> {{ dateFormat(item.end_time) }}</p>
              </v-card-text>
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="5"
              class="text-center">
              <v-icon class="pin">mdi-human-capacity-increase</v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-col>
</v-row>
</template>
<script>
  export default {
    data: () => ({
      reverse: true,
      loading: false,
      activities: [],
      dateNow: ''
    }),

    created () {
      let date = new Date().toDateString()
      this.dateNow = Date.parse(date)
      this.fethcActivities()
    },

    methods: {
      fethcActivities () {
        this.loading = true
        this.API_POST({ url: 'Public_Controller/fetchActivities'})
          .then(response => {
            let data = response.data
            this.activities = data.upCommingActivities.concat(data.passActivities)
          }).catch(error => {  })
          .finally(() => { this.loading = false })
      }
    }
  }
</script>
<style scoped>
.upcomming {
  background-color: #10946d;
}
.ongoing {
  background-color: #e39500;
}
.pin {
  position: absolute;
  top: 25%;
  font-size: 110px;
  left: 68%;
  color: #cacaca40;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
