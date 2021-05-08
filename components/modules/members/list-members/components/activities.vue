<template>
  <v-dialog v-model="dialog"
    persistent
    :max-width="$vuetify.breakpoint.lg ? '60%' : '100%'">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="6">
            <h4>MEMBER ACTIVITIES</h4>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            class="text-right">
              <v-btn
                color="primary"
                text
                @click="$emit('close')">
                Close
              </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="mt-n5">
       <v-container
        class="dotted mt-4"
        fluid>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            class="mt-3">
            <h2>Total Points:
              <span class="points">{{ totalPoints }}</span>
            </h2>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="12"
            class="mt-n2">
            <v-data-table
              class="mt-5"
              :headers="headers"
              :items="activities"
              :items-per-page="15"
              :loading="loading">
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    </v-card>
</v-dialog>
</template>
<script>
export default {
  name: 'Member-Activities',
  props:{
    memberId: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      dialog: true,
      loading: false,
      activities: [],
      headers: [
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Points', value: 'points' },
        { text: 'Start Time', value: 'start_time' },
        { text: 'End Time', value: 'end_time' }
      ],
    }
  },

  computed: {
    totalPoints () {
      let points = 0
      this.activities.forEach(items => {
        points+=parseFloat(items.points)
      })
      return points
    }
  },

  fetch () {
    this.fetchMemberActivities()
  },

  methods: {

    fetchMemberActivities () {
      this.loading = true
      this.API_POST({ url: 'Members/fetchMemberActivities/' + this.memberId})
        .then(response => {
          this.activities = response.data
        }).catch(error => {  })
        .finally(this.loading = false)
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
.points {
  padding: 10px 17px;
  background-color: #4caf50;
  color: #fff;
  border-radius: 25px;
}
</style>