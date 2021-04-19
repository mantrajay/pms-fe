<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
      md="12">
      <v-card
        elevation="0">
        <v-container
          class="mt-n1"
          fluid>
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="4">
              <v-text-field
                v-debounce:300="search"
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
              sm="4"
              md="4">
              <v-select
                :items="yearListStartArrear"
                v-model="activities.year"
                @change="fetchActivities(1)"
                item-text="name"
                item-value="id"
                dense
                outlined
                label="Filter by year"
              ></v-select>
            </v-col>
            <v-col
              v-if="GET_AUTH.roleId == 1"
              cols="12"
              md="4"
              sm="4"
              class="text-right">
              <v-btn
                elevation="0"
                color="primary"
                @click="$emit('show')">
                <v-icon>mdi-plus</v-icon>
                Create Activity
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-col cols="12"
      sm="12"
      md="12"
      class="mt-n3">
      <v-card elevation="0">
        <v-container fluid>
          <h2>Total Points: {{ pager.totalPoints }}</h2>
          <v-data-table
            class="pa-3"
            :headers="tableHeader"
            :items="activities.data"
            :items-per-page="15"
            :loading="activities.loading">
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      elevation="0"
                      v-bind="attrs"
                      v-on="on"
                      @click="$emit('show', item.id)"
                      color="primary"
                      class="ma-1"
                      small>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span>Update</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      small
                      color="indigo"
                      class="white--text ma-1"
                      @click="showSerach = true, activityId = item.id">
                      <v-icon>mdi-briefcase-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Assign Members</span>
                </v-tooltip>
              </div>
            </template>
            <template v-slot:item.name="{ item }">
              <p>{{ stringLimit(item.name, 40) }}</p>
            </template>
            <template v-slot:item.points="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    class="ma-2"
                    color="primary"
                    outlined>
                    {{ item.points }}
                  </v-chip>
                </template>
                <span>Activity points {{ item.points }}</span>
              </v-tooltip>
            </template>
            <template v-slot:item.countAttendees="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    v-on="on"
                    color="success"
                    @click="activityId = item.id, showAttendees = true">
                    {{ item.countAttendees }}
                  </v-chip>
                </template>
                <span>Number of attendees {{ item.countAttendees }}</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-col>
    <SearchMembers
      v-if="showSerach"
      :activityId="activityId"
      @close="closeMembers"/>
    <Attendees
      v-if="showAttendees"
      @close="showAttendees = false"
      :activityId="activityId"/>
  </v-row>
</template>
<script>
import Attendees from './attendees.vue'
export default {
  name: 'Activity-List',
  components: {
    Attendees
  },
  props: {
    reFetch: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      activities: {
        data: [], 
        year: '',
        keyword: '', 
        loading: false
      },
      pager: {
        pageNo: 1,
        totalPage: 1,
        totalPoints: 0,
        limit: 5000
      },
      activityId: '',
      showAttendees: false,
      showSerach: false,
      yearListStartArrear: []
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
          { text: 'Action', value: 'actions'}
        ]
      } else {
        return [
          { text: 'Name', value: 'name' },
          { text: 'Points', value: 'points' },
          { text: 'Time', value: 'time' }
        ]
      }
    }
  },

  watch: {
    reFetch (val) {
      if (val) this.fetchActivities()
    }
  },

  fetch () {
    this.fetchActivities()
    this.yearListArrears()
  },

  methods: {
    search (search) {
      this.activities.keyword = search
      this.fetchActivities(1)
    },

    searchParams (pageNo) {
      return this.formParams({
        keyword: this.activities.keyword,
        year: this.activities.year,
        currentPage: pageNo,
        limit: this.pager.limit
      })
    },

    async fetchActivities (pageNo = 0) {
      this.pager.pageNo = pageNo || this.pager.pageNo
      this.activities.loading = true
      try {
        let response = await this.API_POST({
          url: '/Activities',
          data: this.searchParams(this.pager.pageNo)
        })
        this.activities.data = []
        this.activities.data = response.data.map(items => {
          let date = items.start_time.split(' ')[0]
          let startTime = new Date(items.start_time)
          let endTime = new Date(items.end_time)
          let time = startTime.toLocaleTimeString() + ' - ' + endTime.toLocaleTimeString()
          return {
            id: items.id,
            code: items.code,
            name: items.name,
            points: items.points,
            countAttendees: items.countAttendees,
            date: this.getLocalDate(date),
            time: time
          }
        })
        this.pager.totalPoints = response.totalPoints
        this.pager.totalPage = response.totalPage
        this.$emit('event')
      } catch (error) {
        this.errorHandle(error)
      } finally {this.activities.loading = false }
    },

    closeMembers () {
      this.showSerach = false
      this.fetchActivities()
    }
  }
}
</script>
