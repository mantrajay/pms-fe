<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
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
        <v-row class="mt-5">
          <v-col
            cols="12"
            md="3"
            sm="3"
            class="mt-n4">
            <v-menu
              v-model="startDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                type="date"
                v-model="filter.start"
                outlined
                dense
                label="Select Start Date"
                v-bind="attrs"
                v-on="on" />
            </template>
              <v-date-picker
                v-model="filter.start"
                @input="startDate = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            md="3"
            sm="3"
            class="mt-n4">
            <v-menu
              v-model="endDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                type="date"
                v-model="filter.end"
                outlined
                dense
                label="Select End Date"
                v-bind="attrs"
                v-on="on" />
            </template>
              <v-date-picker
                v-model="filter.end"
                @input="endDate = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            md="6"
            sm="6"
            class="mt-n4">
            <v-btn
              color="primary"
              elevation="0"
              @click="fetchMemberActivities('/filter')">
              Filter
            </v-btn>
            <v-btn
              color="error"
              elevation="0"
              @click="clearFilter">
              Clear
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            class="mt-n5">
            <h2>Total Points:
              <span class="points">{{ totalPoints }}</span>
            </h2>
          </v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col
            cols="12"
            md="12"
            sm="12">
            <v-data-table
              class="mt-5"
              :headers="headers"
              :items="activities"
              :items-per-page="15"
              loading-text="Loading... Please wait"
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
      startDate: false,
      endDate: false,
      filter: {
        start: '',
        end:''
      },
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
    clearFilter() {
      this.fetchMemberActivities()
      this.filter.start = ''
      this.filter.end = ''
    },

    fetchMemberActivities (params = '') {
      this.loading = true
      this.API_POST({
        url: `Members/fetchMemberActivities/${this.memberId}${params}`,
        data: this.formParams({
          start: this.filter.start,
          end: this.filter.end
        })
      })
      .then(response => {
        this.activities = response.data
      }).catch(error => {  })
      .finally(() => {
        this.loading = false
      })
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