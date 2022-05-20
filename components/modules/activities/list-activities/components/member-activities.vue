<template>
  <v-card elevation="0">
    <v-container
      fluid>
      <v-row class="pa-3 mt-1">
        <v-col
          cols="12"
          sm="3"
          md="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            dense
            placeholder="Search activities..."
            outlined
            hide-details
          ></v-text-field>
        </v-col>
          <v-col
            cols="12"
            md="3"
            sm="3">
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
            sm="3">
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
            md="3"
            sm="3">
            <v-btn
              color="primary"
              elevation="0"
              @click="fetchMemberActivities('/filter')">
              Filter
            </v-btn>
            <v-btn
              color="error"
              elevation="0"
              @click="reset">
              Clear
            </v-btn>
          </v-col>
        <!-- <v-col
          cols="12"
          sm="3"
          md="3">
          <v-select
            :items="yearListStartArrear"
            v-model="year"
            @change="fetchMemberActivities"
            item-text="name"
            item-value="id"
            dense
            outlined
            label="Filter by year"
          ></v-select>
        </v-col> -->
        <!-- <v-col
          cols="12"
          sm="1"
          md="1">
          <v-btn
            @click="reset"
            color="primary">
            Reset
          </v-btn>
        </v-col> -->
        <v-col
          cols="12"
          sm="4"
          md="4">
          <h2>Total Points:
            <span class="points">{{ totalPoints }}</span>
          </h2>
        </v-col>
        <v-col
          cols="12"
          md="12"
          sm="12">
          <v-data-table
            :search="search"
            :headers="headers"
            :items="activities"
            :items-per-page="15"
            :loading="loading">
        </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  name: 'Member-Activities-List',
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
      year: '',
      activities: [],
      search: '',
      yearListStartArrear: [],
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
      ]
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
    this.yearListArrears()
  },

  methods: {
    reset () {
      this.year = ''
      this.search = ''
      this.filter.start = ''
      this.filter.end = ''
      this.fetchMemberActivities()
    },
  
    fetchMemberActivities (params = '') {
      // let formData = new FormData()
      // formData.append('year', this.year)
      this.loading = true
      this.activities = []
      this.API_POST({
        url: `Members/fetchMemberActivities/${this.memberId}${params}`,
        data: this.formParams({
          start: this.filter.start,
          end: this.filter.end
        })
      })
      .then(response => {
        this.activities = response.data.map(item => {
            return {
              code: item.code,
              name: item.name,
              points: item.points,
              start_time: this.dateFormat(item.start_time),
              end_time: this.dateFormat(item.end_time),
            }
        })
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