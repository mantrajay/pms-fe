<template>
<div>
  <SkeletonLoading v-if="loading"/>
  <v-row v-else>
    <v-col
      v-for="(item, index) in activities"
      :key="index"
      cols="12"
      md="4"
      sm="4">
      <v-card
        class="activity-card"
        outlined>
        <v-card-text>
          <b class="title-activity">{{ stringLimit(item.name, 30) }}</b>
          <p class="mt-3"><b>Sponsor:</b> {{ item.sponsor }}</p>
          <p><b>Speaker:</b> {{ item.speaker_name }}</p>
          <p><b>Venue:</b> {{ item.venue }}</p>
          <p><b>Start:</b> {{ dateFormat(item.start_time) }}</p>
          <p><b>End:</b> {{ dateFormat(item.end_time) }}</p>
        </v-card-text>
        <v-card-actions class="mt-n3">
          <v-alert
            outlined
            :type="
            dateNow > Date.parse(item.end_time)
                ? '#10946d'
                : Date.parse(item.end_time) === dateNow
                 ? 'Ongoing'
                 : '#ffb463' 
                 "
            prominent
            border="right">
            {{
              dateNow > Date.parse(item.end_time)
                ? 'Done'
                : Date.parse(item.end_time) === dateNow
                 ? 'Ongoing'
                 : 'Upcoming' 
            }}
          </v-alert>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>
<script>
  export default {
    name: 'Activities',
    data: () => ({
      loading: false,
      activities: [],
      dateNow: null
    }),

    created () {
      this.fethcActivities()
      let date = new Date().toDateString()
      this.dateNow = Date.parse(date)
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
.title-activity {
  font-size: 17px;
}
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
.past {
  background-color: #10946d;
}
p {
  margin: 3px auto;
}
.activity-card {
  border-top: 2px solid #10946d;
}
</style>
