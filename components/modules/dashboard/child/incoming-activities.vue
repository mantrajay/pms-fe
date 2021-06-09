<template>
  <v-row>
    <v-col cols="12"
      sm="12"
      md="12"
      class="mt-n3">
      <v-card elevation="0">
        <v-container fluid>
          <h4>UPCOMING ACTIVITIES</h4>
          <v-data-table
            class="pa-3"
            :headers="tableHeader"
            :items="activities"
            :items-per-page="15"
            :loading="loading">
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Logs-List',
  data () {
    return {
      loading: false,
      activities: []
    }
  },

  computed: {
    tableHeader () {
      if (this.GET_AUTH.roleId == 1) {
        return [
          { text: 'Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Attendees', value: 'countAttendees' },
          { text: 'Date', value: 'date' },
          { text: 'Time', value: 'time' },
        ]
      } else {
        return [
          { text: 'Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Time', value: 'time' },
          { text: 'Date', value: 'date' },
          { text: 'Venue', value: 'venue' },
        ]
      }
    }
  },

  fetch () {
    this.fetchIncommingActivities()
  },

  methods: {
    async fetchIncommingActivities () {
      this.loading = true
      try {
        let response = await this.API_POST({
          url: '/Activities/incommingActivities'
        })
        this.activities = response.data.map(items => {
          let date = items.start_time.split(' ')[0]
          let startTime = new Date(items.start_time)
          let endTime = new Date(items.end_time)
          let time = startTime.toLocaleTimeString() + ' - ' + endTime.toLocaleTimeString()
          return {
            id: items.id,
            code: items.code,
            name: items.name,
            venue: items.venue,
            points: items.points,
            countAttendees: items.countAttendees,
            date: this.getLocalDate(date),
            time: time
          }
        })
      } catch (error) {
        this.errorHandle(error)
      } finally {this.loading = false }
    }
  }
}
</script>
